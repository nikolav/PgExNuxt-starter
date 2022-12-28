const express = require('express');
const router = express.Router();
const apolloGraphql = require('../../config/apollo-graphql');

;(async () => {
  router.use('/graphql', await apolloGraphql);
})();

router.use('/status', require('./status.route'));
router.use('/users', require('./user.route'));
router.use('/auth', require('./auth.route'));
router.use('/session', require('./session.route'));
router.use('/variables', require('./variables.route'));
router.use('/mail', require('./mail.route'));
router.use('/upload', require('./upload.route'));
router.use('/download', require('./download.route'));
router.use('/shared', require('./shared.route'));
router.use('/docs', express.static('docs'));

// for testing auth guards
router.use('/testing', require('./testing.route'));

module.exports = router;
