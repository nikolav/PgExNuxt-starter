// const fs = require('fs');
// const path = require('path');
// const resolverMiddlewares = require('./src/utils/resolver-middlewares');
// const logger = require('./src/config/logger');
// const mailer = require('./src/services/emails/emailProvider');
// const inlineTemplate = require('./src/utils/inline-template');
// const htmlToBufferPdf = require('./src/services/pdf/html-to-buffer-pdf');
// const testId = require('./src/utils/test-id');
// const db = require('./src/config/mongoose');
// const Test = require('./src/models/test.model');
// const { isEmpty } = require('validator');

// const FormData = require('form-data');

// const fs = require('fs/promises');
// const { createWriteStream } = require('fs')
// const { Readable } = require("node:stream");


// 
// const { hashSync } = require('bcryptjs')

// const { cached } = require('./src/utils');
const model = require('./src/models/sequelize')
; (async () => {
  // db.connect();
  // const { Tokens } = await model;
  // const tok = await Tokens.findAll({ raw: true })
  // console.log(tok);

  // const message = await inlineTemplate({
  //   template: 'test-doc/index.html',
  //   locals: {
  //     // message: `hello --${testId()}`
  //     title: `title --${testId()}`,
  //     description: `description --${testId()}`,
  //     price: testId()
  //   },
  //   config: {
  //     templatesPath: path.join(__dirname, './src/services/pdf')
  //   }
  // });
  // const buffer = await htmlToBufferPdf(message);
  // fs.createWriteStream(path.join(__dirname, 'out.pdf')).write(buffer);

  // await Test.create({ name: 'admin.name', value: 'nikolav' });
  // const test = await Test.findOne({ name: 'admin.name' });
  // console.log({ id: test.id });

  // const { Upload } = await model;
  // const res = await Upload.unlink("o7rfa3");


  // await Tokens.expire("@22@");
  // const tokens = await Tokens.findAll({ raw: true, attributes: ['token', 'expired'] });
  // console.log(tokens);

  // resolverMiddlewares(
  //   async (...a) => {
  //     console.log('@1');
  //     console.log({ a });
  //   },
  //   async (...a) => {
  //     console.log('@2');
  //     throw `error`;
  //     console.log({ a });
  //   },
  //   async (...a) => {
  //     console.log('@@handler');
  //     console.log({ a });
  //   },
  // )(1, 22);

  // const fd = new FormData();

  // const b1 = Buffer.alloc(256)
  // b1.write("nikolav", "utf-8")
  // const b2 = await fs.readFile('./out.pdf');

  // const r$ = new Readable({
  //   async read() {
  //     this.push(Buffer.concat([b1, b2]));
  //   }
  // });

  // const b = Buffer.from([65]);
  // createWriteStream(path.join(__dirname, 'out')).write(b);
  
  const { Main } = await model;
  const res = await Main.count({ where: { name: "admin.email" } });
  console.log({ res });

})();
