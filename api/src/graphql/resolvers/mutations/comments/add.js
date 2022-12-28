const model = require('../../../../models/sequelize');
const { assign, withMiddleware } = require('../../../../utils');
const checks = require('../../../../validations/checks');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Add a comment
 * @apiName         GraphqlAddComment
 * @apiGroup        Graphql-Comments
 * @apiDescription  Adds a comment
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `mutation { commentsAdd(comment: InputComment!): Comment! }`
 *
 * @apiSuccess {Object} data  Added comment
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "commentsAdd": {
 *           "id"      : "@c1-22-333",
 *           "value" : "lorem",
 *           "topicID": "@c-1",
 *           "userId": "12",
 *           "userName": "joe", 
 *           "createdAt": "<Date>",
 *           "updatedAt": "<Date>"
 *         }
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(
  // !empty body.comment.topicID
  // !empty body.comment.value
  checks.comments.add,

  async (
    // eslint-disable-next-line no-unused-vars
    _source,
    // args
    { comment: { topicID, value, userId, userName } },
    // context;
    // @todo: !context.model not available
    { httpStatus, res, config }
  ) => {
    const { Comment } = await model;
    const { IOEVENT_COMMENTS_CHANGE } = config;
    const cmt$ = await Comment.create({ topicID, value, userId, userName });
    if (cmt$) {
      assign(res, { CODE: httpStatus.CREATED });
      useIO(io => io.emit(`${IOEVENT_COMMENTS_CHANGE}:${topicID}`));
    }
    return cmt$;
  }
);
