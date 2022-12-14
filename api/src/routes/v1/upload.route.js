const router = require('express').Router();
const {
  auth: { authorize },
} = require('../../middlewares');
const { upload: controller } = require('../../controllers');
const upload = require('../../config/multer');

router
  .route('/')
  /**
   * @api             {post} v1/upload Upload files and data
   * @apiName         FilesUpload
   * @apiGroup        Upload
   * @apiDescription  Upload files and data
   * @apiVersion      1.0.0
   * @apiPermission   token
   *
   * @apiHeader {String}  Authorization Access token
   *
   * @apiParam  {String}  [input] Files and form data
   *
   * @apiSuccess {Object[]} files Saved uploaded files
   *
   * @apiError  Unauthorized 401  Unauthorized -- Access token
   */
  .post(authorize(), upload(), controller.upload);

module.exports = router;
