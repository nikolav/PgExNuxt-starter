
const { DataTypes, Model } = require('sequelize');
const get = require('lodash/get');
const assign = require('lodash/assign');
const pick = require('lodash/pick');

const gzip = require('../../../utils/gzip');
const logger = require('../../../config/logger');

class Collection extends Model {

  static async tagged(tag) {
    let data = [];
    if (tag) {
      try {
        const { Tag } = this;
        // eager-loading-filtered-at-the-associated-model-level
        // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#eager-loading-filtered-at-the-associated-model-level
        // ..where clause in the include makes inner join. same as <required: true>
        data = await this.findAll({
          include: {
            model: Tag,
            where: { tag },
            // select `Tag` attributes
            attributes: [],
            // select pivot attributes
            through: { attributes: [] },
          },
        });
      } catch (error) {
        logger.error(error);
      }
    }
    return data;
  }

  static async doc(docId) {
    let d$ = null;
    if (docId) {
      try {
        d$ = await this.findOne({ where: { docId } });
      } catch (error) {
        logger.error(error);
      }
    }
    return d$;
  }

  static async removeDoc(id) {
    let numDocsDeleted = 0;
    try {
      const { CollectionTag } = this;
      numDocsDeleted = await this.destroy({ where: { id } });
      if (0 < numDocsDeleted) {
        await CollectionTag.destroy({ where: { CollectionId: id } });
      }
    } catch (error) {
      logger.error(error);
    }
    return numDocsDeleted;
  }

  static async setDoc(doc, tag) {
    let doc$ = null;
    try {
      const { CollectionTag, Tag } = this;

      const id = get(doc, "id");
      const d = pick(doc, ["data", "docId"]);

      if (!id) {
        doc$ = await this.create(d);
      } else {
        const [d$, docCreated] = await this.findOrCreate({ where: { id }, defaults: d });
        if (!docCreated) {
          // update
          assign(d$, d);
          await d$.save();
        }
        doc$ = d$;
      }

      const [tag$] = await Tag.findOrCreate({ where: { tag } });
      await CollectionTag.findOrCreate({ where: { CollectionId: doc$.id, TagId: tag$.id } });

    } catch (error) {
      logger.error(error);
    }
    return doc$;
  }

  static async upsertDoc(docId, jsonData = JSON.stringify({})) {
    let d$ = null;
    try {
      const d = { data: jsonData };
      const [doc$, docCreated] = await this.findOrCreate({ where: { docId }, defaults: d });
      if (!docCreated) {
        assign(doc$, d);
        await doc$.save();
      }
      d$ = doc$;
    } catch (error) {
      logger.error(error);
    }
    return d$;
  }
}

module.exports = (client) => {
  Collection.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      docId: {
        type: DataTypes.STRING,
        unique: true,
      },

      // json, gzipped
      data: {
        type: DataTypes.TEXT,
        get() {
          return gzip.unzip(this.getDataValue('data'));
        },
        set(dataUnzipped) {
          this.setDataValue('data', gzip.zip(dataUnzipped));
        },
      },

    },
    {
      tableName: 'collections',
      modelName: 'Collection',
      sequelize: client,
      timestamps: true,
    });
  return Collection;
};

// @Collection
// .id
// .docId?
// .data
// [timestamps]

// @Tag
// .id
// .tag
// [timestamps]

// @CollectionTag
// .id
// .CollectionId
// .TagId
// [timestamps]
