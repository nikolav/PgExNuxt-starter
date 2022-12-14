const fs = require('fs/promises');
// const { createReadStream } = require('fs');
const { Readable } = require('node:stream');
const pick = require('lodash/pick');
const httpStatus = require('http-status');

const htmlToPdfBuffer = require('../services/pdf/html-to-buffer-pdf');
const {
  hasOwn,
  inlineTemplate,
  setDownloadHeaders,
} = require('../utils');
const {
  pdfTemplatesPath,
  defaultPdfTemplate,
} = require('../config/vars');
const model = require('../models/sequelize');
const APIError = require('../errors/api-error');

//
const templateLocals = {
  [defaultPdfTemplate]: ({ body }) =>
    pick(body, ['title', 'description']),
};

module.exports = {
  // eslint-disable-next-line no-unused-vars
  downloadFromStorage: async ({ params, user }, res, next) => {
    let errMessage;
    let errStatus = httpStatus.BAD_REQUEST;

    try {
      const { fileID } = params;
      const { Upload } = await model;

      if (!(await Upload.ownsFile(user, fileID))) {
        errStatus = httpStatus.FORBIDDEN;
        throw `forbidden`;
      }

      const { path, filename } = await Upload.findOne({
        where: { fileID },
        attributes: ['path', 'filename'],
      });
      if (!path) throw `bad request`;

      // check disk for file
      const { size } = await fs.stat(path);
      if (!size) throw `no file`;

      // join B1:filename and B2:file binaries
      // slice-unpack message @client
      const B1 = Buffer.alloc(1024);
      B1.write(filename, 'utf-8');
      const B2 = await fs.readFile(path);

      const read$ = new Readable({
        read() {
          this.push(Buffer.concat([B1, B2]));
        },
      });

      setDownloadHeaders({ res, size, filename });
      return read$.pipe(res);
    } catch (error) {
      errMessage = error.message;
    }

    next(
      new APIError({
        status: errStatus,
        message: errMessage,
      })
    );
  },

  // eslint-disable-next-line no-unused-vars
  generatePdfFromTemplate: async (req, res, _next) => {
    const { template } = req.params;
    if (!hasOwn(templateLocals, template))
      template = defaultPdfTemplate;

    const locals = templateLocals[template](req);

    const bufferPdf = await htmlToPdfBuffer(
      await inlineTemplate({
        template: `${template}/index.html`,
        locals,
        config: {
          templatesPath: pdfTemplatesPath,
        },
      })
    );
    const read$ = new Readable({
      read() {
        this.push(bufferPdf);
      },
    });

    setDownloadHeaders({
      res,
      size: bufferPdf.length,
      filename: `downloaded.pdf`,
    });
    read$.pipe(res);
    res.status(201);
  },
};
