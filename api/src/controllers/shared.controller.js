const fs = require('fs/promises');
const { Readable } = require('node:stream');
const httpStatus = require('http-status');

const model = require('../models/sequelize')
const APIError = require('../errors/api-error');

const defaultMimeType = 'application/octet-stream';

module.exports = {
  fileSharing: async (req, res, next) => {

    const { Upload } = await model;
    const { fileID } = req.params;

    try {
      const file$ = await Upload.findOne({ where: { fileID } });
      if (!file$ || (true !== file$.public)) throw `file.[${fileID}] unavailable`;

      const bufferFile = await fs.readFile(file$.path);
      const read$ = new Readable({
        read() {
          this.push(bufferFile);
        },
      });

      // res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('Content-Length', file$.size);
      res.setHeader('Content-Type', file$.mimetype || defaultMimeType);

      read$.pipe(res);

      return res.status(httpStatus.OK);
    } catch (error) {
      // ignore
    }

    next(
      new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `bad request`,
      })
    );

  }
};
