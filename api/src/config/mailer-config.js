const path = require('path');

const {
  emailConfig: { defaultFrom },
} = require('../config/vars');

module.exports = {
  paths: {
    templatesPath: path.join(__dirname, '../services/emails'),
    defaultTemplate: 'text-message/index.html',
  },

  message: {
    from: defaultFrom,
    subject: 'hello @subject',
    text: 'hello @text',
    // to: "",
    // cc: defaultFrom,
    // bcc: "",
    // html: '<p>html message</p>',
    // attachments: ["<files...>"],
  },
};
