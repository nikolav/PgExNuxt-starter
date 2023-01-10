const model = require('../../../../models/sequelize');
const { withMiddleware } = require('../../../../utils');
const checks = require('../../../../validations/checks');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Update doc
 * @apiName         GraphqlUpdateDoc
 * @apiGroup        Graphql-Collection
 * @apiDescription  Updates doc
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `mutation { collectionUpsertDoc(docId: String!; jsonData: String!): Doc! }`
 *
 * @apiSuccess {Object} data  Upserted doc
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "collectionUpsertDoc": {...}
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(

  // !empty .docId
  // !empty .jsonData
  checks.collection.updateDoc,

  // eslint-disable-next-line no-unused-vars
  async (_source, args, context, _info) => {
    const { Collection } = await model;
    const { docId, jsonData } = args;
    const { user, config } = context;
    const { IOEVENT_DOC_CHANGE } = config;
    const doc$ = await Collection.upsertDoc(user, docId, jsonData);
    if (doc$) {
      // IOEVENT_DOC_CHANGE: "change:doc"
      useIO(io => io.emit(`${IOEVENT_DOC_CHANGE}:${user.id}:${docId}`));
    }
    return doc$;
  }
);
