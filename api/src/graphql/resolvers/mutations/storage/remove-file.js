/**
 * @api             {post} v1/graphql Remove File
 * @apiName         GraphqlRemoveFile
 * @apiGroup        Graphql-File
 * @apiDescription  Removes a file
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { mutation storageRemoveFile(fileID: String!): String! }`
 *
 * @apiSuccess {String} fileID  Mutation result, removed fileID
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "storageRemoveFile": "ID-122333"
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_source, args, context) => {
  const { fileID } = args;
  const { model } = context;
  const { Upload } = await model;
  return await Upload.unlink(fileID);
};
