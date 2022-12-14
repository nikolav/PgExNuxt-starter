const assign = require('lodash/assign');
const { get, pick, map } = require('lodash');
const httpStatus = require('http-status');
const model = require('../models/sequelize');

// https://www.npmjs.com/package/multer
module.exports = {
  // eslint-disable-next-line no-unused-vars
  upload: async (req, res, next) => {
    // files stored in prev mw. @upload.config
    // loop stored files, save file info in db
    const { files, body, user } = req;
    if (!files.length) return res.json([]);

    const { Upload } = await model;
    const uploadedFiles = map(files, (node) => {
      const { fieldname } = node;
      return assign(
        {
          user_id: user.id,
          title: get(body, `${fieldname}.title`),
          description: get(body, `${fieldname}.description`),
        },
        pick(node, 'fileID filename path size mimetype meta'.split(' '))
      );
    });

    const savedFiles = await Upload.bulkCreate(uploadedFiles, {
      validate: true,
    });

    return res.status(httpStatus.CREATED).json(savedFiles);
  },
};
