const model = require('../../../../models/sequelize');

/**
 * @api             {post} v1/graphql List all Messages
 * @apiName         GraphqlAllMessages
 * @apiGroup        Graphql-Messages
 * @apiDescription  Lists all messages
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { messages: [Message]! }`
 *
 * @apiSuccess {Object} data  Message
 * @apiSuccess {String} data.id Message id
 * @apiSuccess {String} data.content Message content
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "messages": [
 *           { "id": "@1", "content": "1" },
 *           { "id": "@2", "content": "2" }
 *         ]
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_p, _a, _c) => {
  const { Message } = await model;
  return await Message.findAll();
};
