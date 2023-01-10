const { DataTypes, Model } = require('sequelize');
const gzip = require('../../../utils/gzip');
const logger = require('../../../config/logger');
const { get, assign, pick } = require('../../../utils');

class Collection extends Model {

  static async tagged(user, tag) {
    let data = [];
    if (tag) {
      try {
        const { Tag } = this;
        const { id: userId } = user;
        // eager-loading-filtered-at-the-associated-model-level
        // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#eager-loading-filtered-at-the-associated-model-level
        // ..where clause in the include makes inner join. same as <required: true>
        data = await this.findAll({
          where: { userId },
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

  static async doc(user, docId) {
    let d$ = null;
    if (docId) {
      try {
        const { id: userId } = user;
        d$ = await this.findOne({ where: { userId, docId } });
      } catch (error) {
        logger.error(error);
      }
    }
    return d$;
  }

  static async removeDoc(user, id) {
    let numDocsDeleted = 0;
    try {
      const { id: userId } = user;
      const { CollectionTag } = this;
      numDocsDeleted = await this.destroy({ where: { id, userId } });
      if (0 < numDocsDeleted) {
        await CollectionTag.destroy({ where: { CollectionId: id } });
      }
    } catch (error) {
      logger.error(error);
    }
    return numDocsDeleted;
  }

  static async setDoc(user, doc, tag) {
    let doc$ = null;
    try {
      const { CollectionTag, Tag } = this;
      const { id: userId } = user;

      const id = get(doc, "id");
      const d = assign(pick(doc, ["data", "docId"]), { userId });

      if (!id) {
        doc$ = await this.create(d);
      } else {
        const [d$, docCreated] = await this.findOrCreate({ where: { id, userId }, defaults: d });
        if (!docCreated) {
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

  static async upsertDoc(user, docId, jsonData = JSON.stringify({})) {
    let d$ = null;
    try {
      const { id: userId } = user;
      const d = { data: jsonData };
      const [doc$, docCreated] = await this.findOrCreate({ where: { userId, docId }, defaults: d });
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

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        index: true,
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

      docId: {
        type: DataTypes.STRING,
        index: true,
      },

    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "docId"]
        }
      ],
      tableName: 'collections',
      modelName: 'Collection',
      sequelize: client,
      timestamps: true,
    });
  return Collection;
};

// @collection, model.Collection
// .id
// .userId
// .data
// .docId?
// [timestamps]

// @tags, model.Tag
// .id
// .tag
// [timestamps]

// @ln_collection_tag, model.CollectionTag
// .id
// .collectionId
// .tagId
// [timestamps]
