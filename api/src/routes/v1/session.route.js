const router = require('express').Router();
const {
  auth: { authorize, LOGGED_USER },
  session: canAccessSession,
} = require('../../middlewares');
const checks = require('../../validations/checks');
const { validation } = require('../../utils');
const { session: controller } = require('../../controllers');

router
  .route('/')
  /**
   * @api             {post} v1/session Store session data
   * @apiName         StoreSession
   * @apiGroup        Session
   * @apiDescription  Stores user session data
   * @apiVersion      1.0.0
   * @apiPermission   token
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String}  sessionToken  Session access token
   * @apiParam  {Object} data Session data to store/put
   *
   * @apiSuccess {Object} session Session data stored
   *
   * @apiError  BadRequest 400    BadRequest -- Fails if invalid input provided
   * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access sessions
   * @apiError  Forbidden 403     Forbidden -- Only allow access to own session data
   */
  .post(
    authorize(),
    validation(checks.session.putSession),
    canAccessSession,
    controller.put
  );

router
  .route('/:userId')
  /**
   * @api             {post} v1/session/<userId> Read user session data
   * @apiName         ReadSession
   * @apiGroup        Session
   * @apiDescription  Read user session data
   * @apiVersion      1.0.0
   * @apiPermission   user
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String}  sessionToken  Session access token
   *
   * @apiSuccess {Object} session json session data
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data-1": "any",
   *       "data-2": "any",
   *       "...": "..."
   *     }
   *
   * @apiError  BadRequest 400    BadRequest -- Fails if no session access token provided in body
   * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access sessions
   * @apiError  Forbidden 403     Forbidden -- User can only access own session
   */
  .post(
    authorize(LOGGED_USER),
    validation(checks.session.findSession),
    canAccessSession,
    controller.findSession
  )

  /**
   * @api             {delete} v1/session/<userId> Destroy user session data
   * @apiName         DestroySession
   * @apiGroup        Session
   * @apiDescription  Destroy user session data
   * @apiVersion      1.0.0
   * @apiPermission   user
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String}  sessionToken  Session access token
   *
   * @apiSuccess {Object} result  Action result signal
   * @apiSuccess {Number} result.rowsDeleted  Number of session data deleted, `0|1`
   *
   * @apiError  BadRequest 400    BadRequest -- Fails if invalid input provided
   * @apiError  Unauthorized 401  Unauthorized -- Only authenticated users can access sessions
   * @apiError  Forbidden 403     Forbidden -- Only access own session data
   */
  .delete(
    authorize(LOGGED_USER),
    validation(checks.session.destroySession),
    canAccessSession,
    controller.destroy
  );

module.exports = router;
