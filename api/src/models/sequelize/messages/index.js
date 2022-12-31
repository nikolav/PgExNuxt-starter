const { DataTypes, Model } = require('sequelize');

class Message extends Model { }

module.exports = (client) => {
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'messages',
      modelName: 'Message',
      sequelize: client,
      timestamps: true,
    }
  );
  return Message;
};
