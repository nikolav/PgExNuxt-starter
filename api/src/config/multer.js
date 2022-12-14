const multer = require('multer');
const { extension } = require('mime-types');
const { idGen } = require('nikolav-q');
const assign = require('lodash/assign');
const { storagePath } = require('./vars');

const mimeDefault = 'application/octet-stream';
// eslint-disable-next-line no-unused-vars
const fileFilter = (req, file, done) => {
  // [<whitelistMimes>].includes(file.mimetype);
  done(null, true);
};
// eslint-disable-next-line no-unused-vars
const diskStorage = multer.diskStorage({
  // eslint-disable-next-line no-unused-vars
  destination: (req, file, done) => done(null, storagePath),
  // eslint-disable-next-line no-unused-vars
  filename: (req, file, done) => {
    // file
    //   fieldname: 'file1',
    //   originalname: 'out.pdf',
    //   encoding: '7bit',
    //   mimetype: 'application/pdf'
    const meta = JSON.stringify(file);
    const fileID = idGen();
    const { originalname, mimetype = mimeDefault } = file;
    const filename = `${originalname}.${fileID}.${extension(mimetype)}`;

    assign(file, { fileID, meta });
    done(null, filename);
  },
});

// https://www.npmjs.com/package/multer
const configureUpload = () =>
  multer({
    fileFilter,
    storage: diskStorage,
    limits: {
      // 5M, For multipart forms, the max file size (in bytes)
      fileSize: 5242880,
      // For multipart forms, the max number of file fields
      files: 10,
    },
  }).any();

module.exports = configureUpload;
