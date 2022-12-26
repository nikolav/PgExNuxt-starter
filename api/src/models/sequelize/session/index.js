const { DataTypes, Model } = require('sequelize');
const gzip = require('../../../utils/gzip');

class Session extends Model {
  token(user) {
    return user.sessionToken();
  }

  verifyToken(user, token) {
    try {
      return user.verifySessionToken(token);
    } catch (error) {
      // ignore, signal `false`
    }
    return false;
  }
}

module.exports = (client) => {
  Session.init(
    {
      // @id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      // @mongo._id
      user_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      // json data, gzipped
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
      modelName: 'Session',
      sequelize: client,
      tableName: 'sessions',
      timestamps: true,
    }
  );
  //
  return Session;
};
