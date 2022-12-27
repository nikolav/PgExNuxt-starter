const { DataTypes, Model } = require('sequelize');

// const logger = require('../../../config/logger');
const { dateSortedDescBy } = require('../../../utils');

class Comment extends Model {
  static async byTopicId(topicID) {
    let comments = [];
    try {
      if (topicID) {
        const cmts$ = await this.findAll({ where: { topicID } });
        if (0 < cmts$.length)
          comments = cmts$;
      }
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
      modelName: 'Comment',
      sequelize: client,
      tableName: 'comments',
      timestamps: true,
    }
  );

  return Comment;
};
