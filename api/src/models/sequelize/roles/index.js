const { DataTypes, Model } = require('sequelize');

class Role extends Model { }

module.exports = (client) => {
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'roles',
      modelName: 'Role',
      sequelize: client,
      timestamps: true,
    }
  );
  return Role;
};
