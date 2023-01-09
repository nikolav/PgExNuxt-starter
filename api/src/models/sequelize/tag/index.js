const { DataTypes, Model } = require('sequelize');

class Tag extends Model {}

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
