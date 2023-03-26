const { getById } = require("../models/contacts");
const {
  AppError,
  createContactValidator,
  editeContactValidator,
} = require("../utils");

exports.checkContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getById(contactId);

  if (!contactById) {
    return next(new AppError(404, "Not found"));
  }

  req.contact = contactById;

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

  if (error) {
    return next(new AppError(400, error.details[0].message));
  } else {
    req.body = value;

    next();
  }
};
