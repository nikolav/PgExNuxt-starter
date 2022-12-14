const router = require('express').Router();
const { download: controller } = require('../../controllers');
const {
  auth: { authorize },
} = require('../../middlewares');
const checks = require('../../validations/checks');
const { validation } = require('../../utils');

router
  .route('/:fileID')
  .get(
    authorize(),
    validation(checks.download.storage),
    controller.downloadFromStorage
  );

router
  .route('/pdf/:template')

  /**
   * @api             {post} v1/download/pdf/:template Send pdf
   * @apiName         DownloadPdf
   * @apiGroup        Pdf
   * @apiDescription  Generate pdf from templates
   * @apiVersion      1.0.0
   * @apiPermission   public
   *
   * @apiParam  {String}  locals Pdf placeholder key/value pairs
   *
   * @apiSuccess {Buffer} pdf pdf file buffer
   */
  .post(controller.generatePdfFromTemplate);

module.exports = router;
