/* eslint-disable no-unused-vars */

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

    const { Collection, Tag } = await model;

    // const res$ = await Collection.setDoc(
    //   { id: "63bbb5a2c92c0c36cc0efb71" },
    //   {
    //     // id: "b1f31502-b64b-4377-80ba-16a49aa56281",
    //     data: JSON.stringify({ x: Date.now() }),
    //     docId: "$2.2",
    //   }, 
    //   "T2"
    // );

    // const res$ = await Collection.tagged({id: "u1"}, "important");

    // const res$ = await Collection.removeDoc({id: "u1"}, "d476e8ce-5875-4280-8a84-bdd7b7b19988");

    // const res$ = await Collection.doc({id: "u1"}, "d-01");

    // const res$ = await Tag.getDocTags("0bd537bc-5122-4cf2-84d0-08997854bd91");

    const res$ = await Collection.upsertDoc({id: "63bc69511c242427204d9680"}, "d@1", JSON.stringify({x: 1}));
    // const res$ = await Collection.doc({id: "u1"}, "docId-1");

    console.log(JSON.stringify({ res$ }, null, 2));


  })();
// id1
// id2 
// at -
// st -
// data 


