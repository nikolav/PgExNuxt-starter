const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    value: String,
    // t: {
    //   alias: 'test',
    //   type: String,
    // }
  },
  {
    timestamps: true,
    //
    // @@methods
    methods: {},
    //
    // @@statics
    statics: {},
    //
    // @@query
    query: {
      // byName: function () {
      //   return this.where..
      // },
    },
    //
    // @@virtuals
    virtuals: {
      // fullName: {
      //   get() {
      //     return `${this.firstName} ${this.lastName}`;
      //   },
      //   set(v) {
      //     const fields = v.split(' ');
      //     this.firstName = fields[0];
      //     this.lastName = fields[1];
      //   }
      // }
    },
  }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
