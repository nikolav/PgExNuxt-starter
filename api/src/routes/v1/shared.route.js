
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

module.exports = router;
