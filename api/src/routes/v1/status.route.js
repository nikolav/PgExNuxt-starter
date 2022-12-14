const router = require('express').Router();
const { status: controller } = require('../../controllers');
//
router.route('/').get(controller.status);

module.exports = router;
