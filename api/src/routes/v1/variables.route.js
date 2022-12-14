const router = require('express').Router();
const { authorize } = require('../../middlewares/auth');
const { variables: controller } = require('../../controllers');
const checks = require('../../validations/checks');
const { validation } = require('../../utils');

router
  .route('/')

  /**
   * @api {get} v1/variables List all variables
   * @apiDescription List all variables
   * @apiVersion 1.0.0
   * @apiName ListVariables
   * @apiGroup Variables
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Access token
   *
   * @apiSuccess {Object[]} variables All variables
   * @apiSuccess {ID} variables.id All Variable id
   * @apiSuccess {String} variables.name Variable name
   * @apiSuccess {String} variables.value Variable value
   * @apiSuccess {Date} variables.createdAt Variable createdAt
   * @apiSuccess {Date} variables.updatedAt Variable updatedAt
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         "id": "1",
   *         "name": "x1",
   *         "value": "1",
   *         "createdAt": "<Date>",
   *         "updatedAt": "<Date>"
   *       },
   *       {
   *         "id": "2",
   *         "name": "x2",
   *         "value": "2",
   *         "createdAt": "<Date>",
   *         "updatedAt": "<Date>"
   *       }
   *     ]
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access data.
   */
  .get(authorize(), controller.list)

  /**
   * @api {post} v1/variables Upsert variable.
   * @apiDescription Creates variable if it doesnt exist, updates variable value otherwise.
   * @apiVersion 1.0.0
   * @apiName PutVariable
   * @apiGroup Variables
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}      name     Name
   * @apiParam  {String}      value  Value
   *
   * @apiSuccess {ID} id Variable id.
   * @apiSuccess {String} name Variable name
   * @apiSuccess {String} value Variable value
   * @apiSuccess {Date} createdAt Variable createdAt
   * @apiSuccess {Date} updatedAt Variable updatedAt
   *
   * @apiError (BadRequest 400) BadRequest  Missing input data
   * @apiError (Unauthorized 401)  Unauthorized  Authenticated user access
   */
  .post(
    authorize(),
    validation(checks.variables.upsert),
    controller.upsert
  )

  /**
   * @api             {delete} v1/variables Delete variable
   * @apiDescription  Deletes single variable by it's ID
   * @apiVersion      1.0.0
   * @apiName         DeleteVaraible
   * @apiGroup        Variables
   * @apiPermission   user
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String} id Variable ID to delete
   *
   * @apiSuccess {Number} rowsDeleted Deleted variables count, 0 or 1.
   *
   * @apiError  (BadRequest 400)  BadRequest  Fails if no ID input provided
   * @apiError  (Unauthorized 401)  Unauthorized  Authenticated user access
   */
  .delete(
    authorize(),
    validation(checks.variables.destroy),
    controller.destroy
  );

router
  .route('/:name')

  /**
   * @api             {get} v1/variables/<name> Fetch one variable by name.
   * @apiDescription  Fetches one variable by name. `null` if no variable name exists.
   * @apiVersion      1.0.0
   * @apiName         FetchVariable
   * @apiGroup        Variables
   * @apiPermission   user
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String}  name  Variable name to get
   *
   * @apiSuccess {ID} id Variable id
   * @apiSuccess {String} name Variable name
   * @apiSuccess {String} value Variable value
   * @apiSuccess {Date} createdAt Variable createdAt
   * @apiSuccess {Date} updatedAt Variable updatedAt
   *
   * @apiError  (Unauthorized 401)  Unauthorized  Authenticated access
   */
  .get(
    authorize(),
    validation(checks.variables.byName),
    controller.findOneByName
  );

module.exports = router;
