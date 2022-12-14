const { DataTypes } = require('sequelize');

module.exports = (client) =>
  client.define(
    'Main',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        //
        // validates @create/save/update @validator.js
        //   validate: { <rule>: <value> },
        //   validate: { is: /^\w{10}$/ },
        //   validate: { len: [2, 5] },
        //   validate: { isIn: [['yes', 'no']] },
        //
        // throws <SequelizeUniqueConstraintError>
      },
      value: {
        type: DataTypes.TEXT,
        // gzip get/set
        // const { gzipSync, gunzipSync } = require('zlib');
        // get() {
        //   const stored = this.getDataValue('value');
        //   const bufferGzipped = Buffer.from(stored, 'base64');
        //   const bufferUnzipped = gunzipSync(bufferGzipped);
        //   const valueUnzipped = bufferUnzipped.toString();
        //   return valueUnzipped;
        // },
        // set(valueUnzipped) {
        //   const bufferZipped = gzipSync(valueUnzipped);
        //   const valueZipped = bufferZipped.toString('base64');
        //   this.setDataValue('value', valueZipped);
        // },
      },
    },
    {
      tableName: 'main',
      timestamps: true,
      // logging: false,
    }
  );
