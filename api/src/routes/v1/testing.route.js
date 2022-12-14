const router = require('express').Router();
const {
  auth: { authorize },
  rolesGuard,
} = require('../../middlewares');
const { testing: controller } = require('../../controllers');

// for testing route role guard
router
  .route('/test')
  .get(authorize(), rolesGuard('role-test'), controller.testRoute);

module.exports = router;
