const {
  AppError,
  registerUserValidator,
  loginUserValidator,
  verifyUserEmailValidator,
} = require("../utils");

const validateUserRegistration = (req, res, next) => {
  const { error, value } = registerUserValidator(req.body);

  if (error) {
    return next(
      new AppError(400, error.details[0].context.key + " field is not valid")
    );
  } else {
    req.body = value;

    next();
  }
};

const validateUserLogin = (req, res, next) => {
  const { error, value } = loginUserValidator(req.body);

  if (error) {
    return next(
      new AppError(400, error.details[0].context.key + " field is not valid")
    );
  } else {
    req.body = value;

    next();
  }
};

const validateUserConfirmation = (req, res, next) => {
  const { error, value } = verifyUserEmailValidator(req.body);

  if (!value.email) {
    return next(new AppError(400, "missing required field email"));
  } else if (Object.keys(value).length > 1) {
    return next(new AppError(400, "only field email required"));
  } else if (error) {
    return next(
      new AppError(400, error.details[0].context.key + " field is not valid")
    );
  } else {
    req.body = value;

    next();
  }
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserConfirmation,
};
