const model = require('../../../../models/sequelize');
const withMiddleware = require('../../../../utils/resolver-middlewares');
const checks = require('../../../../validations/checks');
const assign = require('lodash/assign');
const { IOEVENT_MESSAGES_CHANGE } = require('../../../../config/vars');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Add a Message
 * @apiName         GraphqlAddMessage
 * @apiGroup        Graphql-Messages
 * @apiDescription  Adds a message
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { mutation addMessage(content: String!): Message! }`
 *
 * @apiSuccess {Object} data  Added message
 * @apiSuccess {String} data.id Message id
 * @apiSuccess {String} data.content Message content
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "id"      : "@1",
 *         "content" : "lorem"
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(
  // !empty body.content
  checks.messages.add,

  // eslint-disable-next-line no-unused-vars
  async (_source, { content }, { res, httpStatus }) => {
    const { Message } = await model;
    const message = await Message.create({ content });
    useIO(io => io.emit(IOEVENT_MESSAGES_CHANGE));
    // graphql http plugin set response code
    assign(res, { CODE: httpStatus.CREATED });
    return message;
  }
);
