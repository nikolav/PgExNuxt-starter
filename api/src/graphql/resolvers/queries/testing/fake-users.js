/* eslint-disable no-unused-vars */
/**
 * @api             {post} v1/graphql List fake users for testing
 * @apiName         FakeUsers
 * @apiGroup        Testing
 * @apiDescription  Get a list of fake users
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `{ query { fakeUsers: [FakeUser!]! } }`
 *
 * @apiSuccess {Object} data  result data
 * @apiSuccess {ID} data.id User id
 * @apiSuccess {userID} data.name User name
 * @apiSuccess {String} data.username User username
 * @apiSuccess {String} data.email User email
 * @apiSuccess {Address} data.address User address
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = async (
  _p,
  _a,
  { axios, config: { FAKE_USERS_URI } },
  _i
) => {
  const { data: fakeUsers } = await axios(FAKE_USERS_URI);
  return fakeUsers;
};
