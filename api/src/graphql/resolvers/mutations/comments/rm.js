const model = require('../../../../models/sequelize');
const { withMiddleware } = require('../../../../utils');
const checks = require('../../../../validations/checks');
const { useIO } = require('../../../../config/io');
/**
 * @api             {post} v1/graphql Remove a comment
 * @apiName         GraphqlRemoveComment
 * @apiGroup        Graphql-Comments
 * @apiDescription  Removes a comment
 * @apiVersion      1.0.0
 * @apiPermission   token
 *
 * @apiHeader {String}  Authorization Access token
 *
 * @apiParam  {String}  query `mutation { commentsRemove(id: ID!): Comment }`
 *
 * @apiSuccess {Object} data  Remove comment
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "commentsRemove": {...} | null
 *     }
 *
 * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access the data
 */
module.exports = withMiddleware(
  // !empty body.id
  checks.comments.rm,

  async (
    // eslint-disable-next-line no-unused-vars
    _source,
    // args
    { id },
    // context;
    // @todo: !context.model not available
    { config }
  ) => {
    const { Comment } = await model;
    const { IOEVENT_COMMENTS_CHANGE } = config;
    let cmt$;
    try {
      cmt$ = await Comment.findByPk(id);
      if (cmt$) {
        const { topicID } = cmt$;
        await cmt$.destroy();
        useIO(io => io.emit(`${IOEVENT_COMMENTS_CHANGE}:${topicID}`));
      }
    } catch (error) {
      // ignore
    }
    return cmt$;
  }
);
