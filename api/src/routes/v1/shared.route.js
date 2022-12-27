
const router = require('express').Router();
const { shared: controller } = require('../../controllers');

/**
 * @api             {get} v1/shared/:fileID access shared file
 * @apiName         GetFile
 * @apiGroup        Storage-Access
 * @apiDescription  Public file accesss
 * @apiVersion      1.0.0
 * @apiPermission   public
 *
 * @apiParam  {String}  fileID      fileID as url param 
 */
router
  .route('/:fileID')
  .get(controller.fileSharing);

/**
 * @api             {get} v1/shared/url/:fileID get shared file's public url
 * @apiName         GetFileUrl
 * @apiGroup        Storage-Access
 * @apiDescription  Public file url
 * @apiVersion      1.0.0
 * @apiPermission   public
 *
 * @apiParam  {String}  fileID      fileID as url param 
 */
router
  .route('/url/:fileID')
  .get(controller.publicUrl);

module.exports = router;
