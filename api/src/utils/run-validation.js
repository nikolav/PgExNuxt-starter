const { validationResult } = require('express-validator');

// process* checks
module.exports = (validations) => async (req, res, next) => {
  await Promise.all(
    validations.map((validation) => validation.run(req))
  );

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: result.array() });
};
