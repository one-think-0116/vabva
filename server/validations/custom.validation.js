const validator = require('validator');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const isMobile = (value, helpers) => {
  if (!validator.isMobilePhone(value, "any")) {
    return helpers.message("please enter a validate phone number");
  }
  return value;
}

const isPolygonCoordsClosedLineStrings = (value, helpers) => {
  const coordsIndxFirst = value[0][0]
  const coordsIndxLast = value[0][value[0].length - 1];

  if (coordsIndxFirst[0] !== coordsIndxLast[0] || coordsIndxFirst[1] !== coordsIndxLast[1]) {
    return helpers.message("The first and last coordinates must match in order to close the polygon");
  }
  return value;
}
module.exports = {
  objectId,
  password,
  isMobile,
  isPolygonCoordsClosedLineStrings
};
