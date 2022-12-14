const httpStatus = require('http-status');
const mailer = require('../services/emails/emailProvider');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  textMessage: async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    const { to, subject, message, text = '' } = req.body;
    const messageId = await mailer.sendMail({
      message: { to, subject, text },
      template: 'text-message/index.html',
      locals: { message },
    });
    //
    if (messageId) res.status(httpStatus.CREATED);
    //
    res.json({ messageId });
  },
};
