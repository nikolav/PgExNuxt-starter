const model = require('../../../../models/sequelize');
const { assign, withMiddleware } = require('../../../../utils');
const checks = require('../../../../validations/checks');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Upsert doc
 * @apiName         GraphqlUpsertDoc
 * @apiGroup        Graphql-Collection
 * @apiDescription  Upserts doc
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `mutation { collectionPutDoc(d: InputDoc!): Doc! }`
 *
 * @apiSuccess {Object} data  Upserted doc
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "collectionPutDoc": {...}
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(

  // !empty .jsonData
  // !empty .tag
  checks.collection.putDoc,

  // eslint-disable-next-line no-unused-vars
  async (_source, args, context, _info) => {
    const { Collection } = await model;
    const { res, httpStatus, config } = context;
    const { IOEVENT_COLLECTION_CHANGE } = config;
    const {
      d: { jsonData: data, tag, id, docId },
    } = args;

    const doc$ = await Collection.setDoc({ id, data, docId }, tag);
    if (doc$) {
      assign(res, { CODE: httpStatus.CREATED });
      useIO(io => io.emit(`${IOEVENT_COLLECTION_CHANGE}:${tag}`));
    }

    return doc$;
  }
);
