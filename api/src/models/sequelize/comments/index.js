const { DataTypes, Model } = require('sequelize');

// const logger = require('../../../config/logger');
const { dateSortedDescBy } = require('../../../utils');

class Comment extends Model {
  static async byTopicId(topicID) {
    let comments = [];
    try {
      if (topicID)
        comments = await this.findAll({ where: { topicID } });
    } catch (error) {
      // ignore
    }

    return comments.sort(dateSortedDescBy("createdAt"));
  }
}

module.exports = (client) => {
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      topicID: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: DataTypes.STRING,

      userName: DataTypes.STRING,

      value: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    },
    {
      tableName: 'comments',
      modelName: 'Comment',
      sequelize: client,
      timestamps: true,
    }
  );

  return Comment;
};
