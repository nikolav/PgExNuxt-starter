const nodemailer = require('nodemailer');
// https://www.npmjs.com/package/email-templates
const Email = require('email-templates');
const merge = require('lodash/merge');

const { emailConfig } = require('../../config/vars');
const {
  message: messageDefaults,
} = require('../../config/mailer-config');
const inlineTemplate = require('../../utils/inline-template');

// SMTP transport
const transporter = nodemailer.createTransport({
  port: emailConfig.port,
  host: emailConfig.host,
  secure: false,
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection');
  }
});

exports.sendMail = ({
  template = 'text-message/index.html',
  message = {},
  locals = {},
}) =>
  // eslint-disable-next-line no-unused-vars
  new Promise(async (resolve, _reject) => {
    let messageId = null;
    try {
      const res = await transporter.sendMail(
        merge({}, messageDefaults, message, {
          html: await inlineTemplate({ template, locals }),
        })
      );
      messageId = res.messageId;
      if (!messageId) throw `sendMail --error`;
    } catch (error) {
      console.error(error);
    }
    //
    resolve(messageId);
  });

exports.sendPasswordReset = async (passwordResetObject) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@your-app.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordReset',
      message: {
        to: passwordResetObject.userEmail,
      },
      locals: {
        productName: 'Test App',
        // display form to update password
        // send both password and resetToken to password-reset rotue
        passwordResetUrl: `https://your-app/new-password/view?resetToken=${passwordResetObject.resetToken}`,
      },
    })
    .catch(() => console.log('error sending password reset email'));
};

exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@your-app.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordChange',
      message: {
        to: user.email,
      },
      locals: {
        productName: 'Test App',
        name: user.name,
      },
    })
    .catch(() => console.log('error sending change password email'));
};
