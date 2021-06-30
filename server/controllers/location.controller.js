const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationService } = require('../services');

const createLocation = catchAsync(async (req, res) => {
  const location = await locationService.createLocation(req.body);
  res.status(httpStatus.CREATED).send(location);
});


const getLocations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['locationName']);
  //search with startWith and include lowercase...
  const _filter = filter?.locationName ? { locationName: new RegExp("^" + filter.locationName, "i") } : {}
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationService.queryLocations(_filter, options);
  res.send(result);
});

const getLocation = catchAsync(async (req, res) => {
  const location = await locationService.getLocationById(req.params.locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  res.send(location);
});

const getAdditionalFee = catchAsync(async (req, res) => {
  const location = await locationService.getLocationById(req.params.locationId);

  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  let addtionalFee = location.additionalFee.find(value => value._id == req.params.additionalFeeId)
  if (addtionalFee == undefined) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Additional fee not found');
  }
  res.send(addtionalFee);
});

const updateLocation = catchAsync(async (req, res) => {
  const location = await locationService.updateLocationById(req.params.locationId, req.body);
  res.send(location);
});

const updateAdditionalFee = catchAsync(async (req, res) => {
  const location = await locationService.updateAdditionalFeeById(req.params.locationId, req.params.additionalFeeId, req.body);
  res.send(location);
});

const deleteLocation = catchAsync(async (req, res) => {
  await locationService.deleteLocationById(req.params.locationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAdditionalFee = catchAsync(async (req, res) => {
  await locationService.deleteAdditionalFeeById(req.params.locationId, req.params.additionalFeeId);
  res.status(httpStatus.NO_CONTENT).send();
});

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
