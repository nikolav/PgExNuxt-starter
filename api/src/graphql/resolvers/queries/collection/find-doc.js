const model = require('../../../../models/sequelize');
/**
 * @api             {post} v1/graphql Read doc
 * @apiName         GraphqlReadDoc
 * @apiGroup        Graphql-Collection
 * @apiDescription  Reads single doc give `.docId`
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { collectionPutDoc(d: InputDoc!): Doc! }`
 *
 * @apiSuccess {Object} data  doc
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "collectionGetDoc": {...}
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_source, args, context, _info) => {
  const { Collection } = await model;
  const { user } = context;
  const { docId } = args;
  return await Collection.doc(user, docId);
};
