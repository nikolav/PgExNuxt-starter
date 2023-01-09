const model = require('../../../../models/sequelize');
const { withMiddleware, each } = require('../../../../utils');
const checks = require('../../../../validations/checks');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Remove a doc
 * @apiName         GraphqlRemoveDoc
 * @apiGroup        Graphql-Collection
 * @apiDescription  Removes a doc
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `mutation { collectionRemoveDoc(id: ID!): Int! }`
 *
 * @apiSuccess {Object} data  Remove doc
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "collectionRemoveDoc": <number>
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(

  // !empty .id
  checks.collection.rmDoc,

  // eslint-disable-next-line no-unused-vars
  async (_source, args, context, _info) => {
    const { Collection, Tag } = await model;
    const { user, config } = context;
    const { IOEVENT_COLLECTION_CHANGE } = config;
    const { id } = args;
    const tags = await Tag.getDocTags(id);
    const numRowsDeleted = await Collection.removeDoc(user, id);
    if (0 < numRowsDeleted) {
      each(tags, tag => useIO(io => io.emit(`${IOEVENT_COLLECTION_CHANGE}:${user.id}:${tag}`)));
    }
    return numRowsDeleted;
  }
);
