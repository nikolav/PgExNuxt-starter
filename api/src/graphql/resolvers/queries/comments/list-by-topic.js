const model = require('../../../../models/sequelize');
/**
 * @api             {post} v1/graphql List all comments by topicID
 * @apiName         GraphqlListComments
 * @apiGroup        Graphql-Comments
 * @apiDescription  Lists all comments by topicID
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query { listCommentsByTopic(topicID: String!): [Comment!]! }`
 *
 * @apiSuccess {Object} data[]  comments
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "listCommentsByTopic": [...]
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_src, args, _context) => {
  const { Comment } = await model;
  const { topicID } = args;
  return await Comment.byTopicId(topicID);
};
