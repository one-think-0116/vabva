const Joi = require('joi');
const { objectId, isMobile, isPolygonCoordsClosedLineStrings } = require('./custom.validation');
const { services, costTypes } = require('../config/services');

const createLocation = {
  body: Joi.object()
    .keys({
      locationName: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      mobile: Joi.string().custom(isMobile),
      geometry: Joi.object().keys({
        type: Joi.string(),
        coordinates: Joi.array().custom(isPolygonCoordsClosedLineStrings)
      }),
      additionalFee: Joi.array().items(
        Joi.object({
          type: Joi.string().valid(...services),
          name: Joi.string(),
          cost: Joi.object().keys({
            type: Joi.string().valid(...costTypes),
            amount: Joi.number()
          })
        })
      )
    })
    .min(1),
};


const getLocations = {
  query: Joi.object().keys({
    locationName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  })
}

const getLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

const getAdditionalFee = {
  param: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
    additionalFeeId: Joi.string().custom(objectId)
  })
}
const updateAdditionalFee = {
  param: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
    additionalFeeId: Joi.string().custom(objectId)
  }),
  body: Joi.object({
    type: Joi.string().valid(...services),
    name: Joi.string(),
    cost: Joi.object().keys({
      type: Joi.string().valid(...costTypes),
      amount: Joi.number()
    })
  })
    .min(1),
}
const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      locationName: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      mobile: Joi.string().custom(isMobile),
      geometry: Joi.object().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required().custom(isPolygonCoordsClosedLineStrings)
      }),
      additionalFee: Joi.array().items(
        Joi.object({
          type: Joi.string().required().valid(...services),
          name: Joi.string().required(),
          cost: Joi.object().required().keys({
            type: Joi.string().required().valid(...costTypes),
            amount: Joi.number().required()
          })
        })
      )
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

const deleteAdditionalFee = {
  param: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
    additionalFeeId: Joi.string().custom(objectId)
  })
}

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
  getAdditionalFee,
  updateAdditionalFee,
  deleteAdditionalFee
};
