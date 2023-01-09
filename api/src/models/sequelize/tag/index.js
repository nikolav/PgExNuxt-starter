const { DataTypes, Model } = require('sequelize');

const { map } = require('../../../utils');

class Tag extends Model {
  static async getDocTags(id) {
    return map(
      await this.findAll({
        include: {
          model: this.Collection,
          where: { id },
          attributes: [],
          through: { attributes: [] }
        },
        attributes: ["tag"]
      }),
      ({ tag }) => tag
    );
  }
}

module.exports = (client) => {
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'tags',
      modelName: 'Tag',
      sequelize: client,
      timestamps: true,
    }
  );
  return Tag;
};

// @tags, model.Tag
// .id
// .tag
// [timestamps]

// @collection, model.Collection
// .id
// .userId
// .data
// .docId?
// [timestamps]

// @ln_collection_tag, model.CollectionTag
// .id
// .collectionId
// .tagId
// [timestamps]
