
/**
 * @api             {post} v1/graphql List all storage files
 * @apiName         GraphqlListFiles
 * @apiGroup        Graphql-Storage
 * @apiDescription  Lists all files
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `query { storageListFiles: [File]! }`
 *
 * @apiSuccess {Object} data  File[]
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "storageListFiles": [
 *           { "id": "@f1", "fileID": "ID-1", ... },
 *         ]
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (_src, _args, context) => {
  const { user: { id: user_id }, model, dateSortedBy } = context;
  const { Upload } = await model;
  const files = await Upload.findAll({ where: { user_id } });
  return files.sort(dateSortedBy("createdAt"));
};
