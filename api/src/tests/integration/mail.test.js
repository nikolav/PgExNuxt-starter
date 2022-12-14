/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const axios = require('axios');
// const qs = require('qs');
// const { isArray, find } = require('lodash');

const app = require('../../index');
const User = require('../../models/user.model');
const model = require('../../models/sequelize');
const mailer = require('../../services/emails/emailProvider');
const { testId } = require('../../utils');
const { ROLE_MAIL_SERVICE_ACCESS } = require('../../config/vars');

const sandbox = sinon.createSandbox();

let AT_userCanMail;
let AT_userCannotMail;
let fakeSendTextMessage;

let user1$;
let user2$;

(() => {
  const userCanMail = { email: 'admin@nikolav.rs', password: '122333' };
  const userCannotMain = {
    email: 'user12@nikolav.rs',
    password: '122333',
  };

  const fakeMessageId = `<${testId()}>`;

  describe('@MailRoute', () => {
    before(async () => {
      const { Role, RoleUser } = await model;

      user1$ = await User.findOne({ email: userCanMail.email });
      user2$ = await User.findOne({ email: userCannotMain.email });

      if (!user1$) user1$ = await User.create(userCanMail);
      if (!user2$) user2$ = await User.create(userCannotMain);

      const userId = user1$.id;
      const [role1] = await Role.findOrCreate({
        where: { name: ROLE_MAIL_SERVICE_ACCESS },
      });
      await RoleUser.findOrCreate({
        where: { userId, roleId: role1.id },
      });

      AT_userCanMail = (await User.findAndGenerateToken(userCanMail))
        .accessToken;
      AT_userCannotMail = (
        await User.findAndGenerateToken(userCannotMain)
      ).accessToken;
    });
    // beforeEach(async () => {});
    afterEach(() => sandbox.restore());
    // after(() => {});

    it('authenticated user with mail access policy can send text message emails', () => {
      // replace mailer.textMessage with fake to
      // check if it gets called in api request
      // .. meaning it tries to use nodemailer to send mail
      fakeSendTextMessage = sinon.fake.resolves(fakeMessageId);
      sinon.replace(mailer, 'sendMail', fakeSendTextMessage);

      return request(app)
        .post('/v1/mail/text-message')
        .set('Authorization', `Bearer ${AT_userCanMail}`)
        .send({
          to: userCanMail.email,
          subject: 'subject --test',
          message: 'message --test',
          text: 'text --test',
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(fakeSendTextMessage.callCount).to.eq(1);
          expect(res.body.messageId).to.eq(fakeMessageId);
        });
    });
    it('sendMail fails if no <mail:to> provided', () =>
      request(app)
        .post('/v1/mail/text-message')
        .set('Authorization', `Bearer ${AT_userCanMail}`)
        .send({
          // to: userCanMail.email,
          subject: 'subject --test',
          message: 'message --test',
          text: 'text --test',
        })
        .expect(httpStatus.BAD_REQUEST)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // no call to sandMail, #1 from 1st call
          expect(fakeSendTextMessage.callCount).to.eq(1);
        }));
    it('sendMail fails if no <mail:subject> provided', () =>
      request(app)
        .post('/v1/mail/text-message')
        .set('Authorization', `Bearer ${AT_userCanMail}`)
        .send({
          to: userCanMail.email,
          // subject: 'subject --test',
          message: 'message --test',
          text: 'text --test',
        })
        .expect(httpStatus.BAD_REQUEST)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // no call to sandMail, #1 from 1st call
          expect(fakeSendTextMessage.callCount).to.eq(1);
        }));
    it('sendMail fails if no <mail:message> provided', () =>
      request(app)
        .post('/v1/mail/text-message')
        .set('Authorization', `Bearer ${AT_userCanMail}`)
        .send({
          to: userCanMail.email,
          subject: 'subject --test',
          // message: 'message --test',
          // text: 'text --test',
        })
        .expect(httpStatus.BAD_REQUEST)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // no call to sandMail, #1 from 1st call
          expect(fakeSendTextMessage.callCount).to.eq(1);
        }));
    it('doesnt allow authenticated user without mail access policy to use mail service', () =>
      request(app)
        .post('/v1/mail/text-message')
        .set('Authorization', `Bearer ${AT_userCannotMail}`)
        .send({
          to: userCanMail.email,
          subject: 'subject --test',
          message: 'message --test',
          text: 'text --test',
        })
        .expect(httpStatus.FORBIDDEN)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // no call to sandMail, #1 from 1st call
          expect(fakeSendTextMessage.callCount).to.eq(1);
        }));
  });
  //
})();
