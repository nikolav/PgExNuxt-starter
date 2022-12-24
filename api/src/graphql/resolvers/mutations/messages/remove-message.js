const model = require('../../../../models/sequelize');
const { IOEVENT_MESSAGES_CHANGE } = require('../../../../config/vars');
const { useIO } = require('../../../../config/io');

/**
 * @api             {post} v1/graphql Remove Message
 * @apiName         GraphqlRemoveMessage
 * @apiGroup        Graphql-Messages
 * @apiDescription  Removes a message
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { mutation removeMessage(id: ID!): Int! }`
 *
 * @apiSuccess {Object} data  Mutation result
 * @apiSuccess {Number} data.removeMessage  Number of deleted rows, `0|1`
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "removeMessage": 1
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_source, { id }, _context) => {
  const { Message } = await model;
  const rowsDeleted = await Message.destroy({ where: { id } });
  if (0 < rowsDeleted)
    useIO(io => io.emit(IOEVENT_MESSAGES_CHANGE));
  // 
  return rowsDeleted;
};
