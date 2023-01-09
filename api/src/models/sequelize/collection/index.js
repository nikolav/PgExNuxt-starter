const { DataTypes, Model } = require('sequelize');
const gzip = require('../../../utils/gzip');
const logger = require('../../../config/logger');

class Collection extends Model {

  static async tagged(user, tag) {
    let data = [];
    if (tag) {
      try {
        const { Tag } = this;
        const { id: userId } = user;
        // eager-loading-filtered-at-the-associated-model-level
        // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#eager-loading-filtered-at-the-associated-model-level
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
        d$ = await this.findOne({
          raw: true,
          where: { userId, docId }
        });
      } catch (error) {
        logger.error(error);
      }
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
