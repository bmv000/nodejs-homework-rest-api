const Contact = require("../models/schema/contactSchema");
const { Types } = require("mongoose");
const {
  AppError,
  createContactValidator,
  editeContactValidator,
} = require("../utils");

exports.checkContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) {
    return next(new AppError(404, "Not found"));
  }

  const contactExists = await Contact.exists({ _id: contactId });

  if (!contactExists) {
    return next(new AppError(404, "Not found"));
  }

  next();
};

exports.validateCreatedContact = (req, res, next) => {
  const { error, value } = createContactValidator(req.body);

  if (error) {
    return next(
      new AppError(400, `missing required ${error.details[0].path[0]} field`)
    );
  } else {
    req.body = value;

    next();
  }
};

exports.validateEditedContact = (req, res, next) => {
  const { error, value } = editeContactValidator(req.body);

  if (Object.keys(req.body).length === 0) {
    return next(new AppError(400, "missing fields"));
  }
  if (error) {
    return next(new AppError(400, error.details[0].message));
  } else {
    req.body = value;

    next();
  }
};

exports.validateEditedStatus = (req, res, next) => {
  const { error, value } = editeContactValidator(req.body);

  if (!Object.keys(req.body).includes("favorite")) {
    return next(new AppError(400, "missing field favorite"));
  }

  if (error) {
    return next(new AppError(400, error.details[0].message));
  } else {
    req.body = value;

    next();
  }
};
