const { DataTypes, Model } = require('sequelize');

class Main extends Model {
  static async byName(name) {
    let node = null;
    try {
      node = await Main.findOne({ where: { name } });
    } catch (error) {
      // ignore
    }
    return node;
  }
}

module.exports = (client) => {
  Main.init(
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
        // // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations
        // validates @create/save/update @validator.js
        //   validate: { <rule>: <value> },
        //   validate: { is: /^\w{10}$/ },
        //   validate: { len: [2, 5] },
        //   validate: { isIn: [['yes', 'no']] },
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
      modelName: 'Main',
      sequelize: client,
      timestamps: true,

      // // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#model-wide-validations
      // validate: {
      //   customModelWideValidation() {
      //     // throw @invalid
      //     // this == model instance
      //   }
      // }

      // paranoid: true, 
      //  # `.restore` method undeletes deleted row
      //  # include deleted rows in queries: `paranoid: false`

      // indexes: [
      //   {
      //     unique: true,
      //     fields: ["userId", "docId"]
      //   }
      // ],


    }
  );
  return Main;
};
