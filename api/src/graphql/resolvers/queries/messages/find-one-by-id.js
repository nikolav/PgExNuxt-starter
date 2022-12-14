const model = require('../../../../models/sequelize');
/**
 * @api             {post} v1/graphql Get one Message
 * @apiName         GraphqlFindMessageById
 * @apiGroup        Graphql-Messages
 * @apiDescription  Get one messages by it's id
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { message(id: ID!): Message }`
 *
 * @apiSuccess {Object} data  Message
 * @apiSuccess {String} data.id Message id
 * @apiSuccess {String} data.content Message content
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "message": {
 *           "id": "@1",
 *           "content": "1"
 *         }
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_source, { id }, _context) => {
  const { Message } = await model;
  return await Message.findOne({ where: { id } });
};
