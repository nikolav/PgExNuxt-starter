const model = require('../../../../models/sequelize');
/**
* @api             {post} v1/graphql get like count by topicID
* @apiName         GraphqlCountLikes
* @apiGroup        Graphql-Likes
* @apiDescription  Get likeCount by topicID
* @apiVersion      1.0.0
* @apiPermission   token
*
* @apiHeader {String}  Authorization Access token
*
* @apiParam  {String}  query `query { likeCount(topicID: String!): Int! }`
*
* @apiSuccess {Number} data.likeCount  likeCount
*
* @apiSuccessExample Success-Response:
*     {
*       "data": {
*         "likeCount": 1
*       }
*     }
*
* @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
*/
// eslint-disable-next-line no-unused-vars
module.exports = async (_src, args, context) => {
  const { Main } = await model;
  const { topicID } = args;
  const { config: { LIKES_PREFIX } } = context;
  const topicName = `${LIKES_PREFIX}${topicID}`;
  // const like$ = await Main.findOne({ where: { name: topicName }, attributes: ['value'] });
  const like$ = await Main.byName(topicName);
  return like$ ? parseInt(like$.value, 10) : 0;
};
