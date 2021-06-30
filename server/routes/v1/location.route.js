const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation');
const locationController = require('../../controllers/location.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('manageLocations'), validate(locationValidation.createLocation), locationController.createLocation)
    .get(auth('getLocations'), validate(locationValidation.getLocations), locationController.getLocations)

router
    .route('/:locationId')
    .get(auth('getLocations'), validate(locationValidation.getLocation), locationController.getLocation)
    .patch(auth('manageLocations'), validate(locationValidation.updateLocation), locationController.updateLocation)
    .delete(auth('manageLocations'), validate(locationValidation.deleteLocation), locationController.deleteLocation);

router
    .route('/:locationId/:additionalFeeId')
    .get(auth('getLocations'), validate(locationValidation.getAdditionalFee), locationController.getAdditionalFee)
    .patch(auth('manageLocations'), validate(locationValidation.updateAdditionalFee), locationController.updateAdditionalFee)
    .delete(auth('manageLocations'), validate(locationValidation.deleteAdditionalFee), locationController.deleteAdditionalFee);

//should have products added to location...
module.exports = router;
