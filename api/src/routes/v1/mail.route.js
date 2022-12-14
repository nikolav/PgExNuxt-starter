const router = require('express').Router();
const {
  auth: { authorize },
} = require('../../middlewares');
const checks = require('../../validations/checks');
const { validation } = require('../../utils');
const { rolesGuard } = require('../../middlewares');
const { ROLE_MAIL_SERVICE_ACCESS } = require('../../config/vars');
const { mail: controller } = require('../../controllers');

router
  /**
   * @api             {post} v1/mail/text-message Send text mail
   * @apiName         MailSendTextMessage
   * @apiGroup        Mail
   * @apiDescription  Send text message mail
   * @apiVersion      1.0.0
   * @apiPermission   guarded
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {Email}  to Mail <to>
   * @apiParam  {String}  subject Mail <subject>
   * @apiParam  {String}  [text]  Short text description
   * @apiParam  {String}  message Mail <message>
   *
   * @apiSuccess {String} messageId Sent mail message id
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "messageId": "<message.id>",
   *     }
   *
   * @apiError  BadRequest 400    BadRequest -- Fails if invalid input provided
   * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
   * @apiError  Forbidden 403     Forbidden -- `ROLE_MAIL_SERVICE_ACCESS` guard
   */
  .route('/text-message')
  .post(
    authorize(),
    rolesGuard(ROLE_MAIL_SERVICE_ACCESS),
    validation(checks.mail.textMessage),
    controller.textMessage
  );

module.exports = router;
