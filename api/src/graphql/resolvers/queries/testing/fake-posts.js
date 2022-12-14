/* eslint-disable no-unused-vars */
/**
 * @api             {post} v1/graphql List fake posts for testing
 * @apiName         FakePosts
 * @apiGroup        Testing
 * @apiDescription  Get a list of fake posts
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `{ query { fakePosts: [FakePost!]! } }`
 *
 * @apiSuccess {Object} data  result data
 * @apiSuccess {ID} data.id Post id
 * @apiSuccess {userID} data.userId Post userId
 * @apiSuccess {String} data.title Post title
 * @apiSuccess {String} data.body Post content
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": {
 *         "fakePosts": [
 *           {
 *             "id": "1",
 *             "userId": "u1",
 *             "title": "t1",
 *             "body": "b1",
 *           },
 *           {
 *             "id": "2",
 *             "userId": "u2",
 *             "title": "t2",
 *             "body": "b2",
 *           }
 *         ]
 *       }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = async (
  _p,
  _a,
  { axios, config: { FAKE_POSTS_URI } },
  _i
) => {
  const { data: fakePosts } = await axios(FAKE_POSTS_URI);
  return fakePosts;
};
