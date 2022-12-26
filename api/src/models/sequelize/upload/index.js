const fs = require('fs/promises');
const { DataTypes, Model } = require('sequelize');
const logger = require('../../../config/logger');

class Upload extends Model {
  static async ownsFile(user, fileID) {
    try {
      const { user_id } = await this.findOne({
        where: { fileID },
        attributes: ['user_id'],
      });
      //
      return user_id === user.id;
    } catch (error) {
      // ignore, flag @false
    }
    //
    return false;
  }

  static async unlink(fileID) {
    let removedFileID = "";
    try {
      const file$ = await this.findOne({ where: { fileID } });
      if (file$) {
        const { path } = file$;
        await file$.destroy();
        await fs.unlink(path);
        removedFileID = fileID;
      }
    } catch (error) {
      // throw error;
      logger.error(error.message);
    }
    return removedFileID;
  }
}

module.exports = (client) => {
  Upload.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      fileID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      title: DataTypes.STRING,

      description: DataTypes.STRING,

      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      size: DataTypes.INTEGER,

      mimetype: DataTypes.STRING,

      meta: DataTypes.STRING,
    },
    {
      modelName: 'Upload',
      sequelize: client,
      tableName: 'uploads',
      timestamps: true,
    }
  );
  //
  return Upload;
};
