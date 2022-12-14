/**
 * @api             {post} v1/graphql Graphql Status Check
 * @apiName         GraphqlStatusCheck
 * @apiGroup        Graphql
 * @apiDescription  Returns 'graphql' string for tests
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `{ query { status } }`
 *
 * @apiSuccess {Object} data       Status
 * @apiSuccess {String} data.status 'graphql' literal
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "status": "graphql"
 *       }
 *     }
 *
 * @apiError  Unauthorized 401 -- Only authenticated users can access data
 *
 */
// eslint-disable-next-line no-unused-vars
module.exports = (parent, args, context, info) => 'graphql';
