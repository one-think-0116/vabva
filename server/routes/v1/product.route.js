const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('manageProducts'), validate(productValidation.createProduct), productController.createProduct)
// .get(auth('getLocations'), validate(locationValidation.getLocations), locationController.getLocations);

//product search based on a specific location Lat and Long .. This should also include filters...
router
    .route('/search')
    .get()

router
    .route('/:locationId')
// .get(auth('getLocations'), validate(locationValidation.getLocation), locationController.getLocation)
// .patch(auth('manageLocations'), validate(locationValidation.updateLocation), locationController.updateLocation)
// .delete(auth('manageLocations'), validate(locationValidation.deleteLocation), locationController.deleteLocation);

// router
//     .route('/:locationId/:additionalFeeId')
//     .get(auth('getLocations'), validate(locationValidation.getAdditionalFee), locationController.getAdditionalFee)
//     .patch(auth('manageLocations'), validate(locationValidation.updateAdditionalFee), locationController.updateAdditionalFee)
//     .delete(auth('manageLocations'), validate(locationValidation.deleteAdditionalFee), locationController.deleteAdditionalFee);

//should have products added to location...
module.exports = router;
