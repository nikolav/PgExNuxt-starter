const model = require('../../../../models/sequelize');
const { withMiddleware } = require('../../../../utils');
const checks = require('../../../../validations/checks');
/**
 * @api             {post} v1/graphql List all docs by topicID
 * @apiName         GraphqlListDocs
 * @apiGroup        Graphql-Collection
 * @apiDescription  Lists all docs by topicID
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query { listDocsByTopic(topicID: String!): [Doc!]! }`
 *
 * @apiSuccess {Object} data[]  comments
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "listDocsByTopic": [...]
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(

  // exists .topicID
  checks.collection.listDocs,

  // handle
  // eslint-disable-next-line no-unused-vars
  async (_src, args, _context) => {
    const { Collection } = await model;
    const { topicID } = args;
    return await Collection.tagged(topicID);
  }
);
