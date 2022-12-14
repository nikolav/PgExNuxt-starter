const { DataTypes, Model } = require('sequelize');
const moment = require('moment-timezone');
const logger = require('../../../config/logger');

class Tokens extends Model {
  static async valid(token) {
    let tok;
    try {
      if (token) {
        // eslint-disable-next-line no-unused-vars
        const [T, _created] = await this.findOrCreate({
          where: { token },
          defaults: { expired: false },
        });
        tok = T;

        if (false !== tok.expired) {
          tok.expired = false;
          await tok.save();
        }
      }
    } catch (error) {
      logger.warn(error.message);
    }
    //
    return tok;
  }
  static async expire(token) {
    await this.destroy({ where: { token } });
  }
  static async expireAll() {
    return this.destroy({ truncate: true });
  }
  static async isValid(token) {
    try {
      const { expired } = await this.findOne({
        where: { token },
        attributes: ['expired'],
      });
      return false === expired;
    } catch (error) {
      // ignore
    }
    //
    return false;
  }
  static async age(token) {
    try {
      const { updatedAt } = await this.findOne({
        where: { token },
        attributes: ['updatedAt'],
      });
      return moment().diff(updatedAt);
    } catch (error) {
      //
    }
  }
}

module.exports = (client) => {
  Tokens.init(
    {
      // @id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      expired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      modelName: 'Tokens',
      sequelize: client,
      tableName: 'token_valid',
      timestamps: true,
    }
  );
  //
  return Tokens;
};
