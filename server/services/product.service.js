const httpStatus = require('http-status');
const { Product, Location } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a location
 * @param {Object} locationBody
 * @returns {Promise<Location>}
 */
const createProduct = async (productBody) => {
    const product = await Product.create(productBody);
    return product;
};

/**
 * Query for locations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLocations = async (filter, options) => {
    const location = await Location.paginate(filter, options);
    return location;
};

/**
 * Get location by id
 * @param {ObjectId} id
 * @returns {Promise<Location>}
 */
const getLocationById = async (id) => {
    return Location.findById(id);
};

/**
 * Update location by id
 * @param {ObjectId} locationId
 * @param {Object} updateBody
 * @returns {Promise<Location>}
 */
const updateLocationById = async (locationId, updateBody) => {
    const location = await getLocationById(locationId);
    if (!location) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
    }
    Object.assign(location, updateBody);
    await location.save();
    return location;
};

/**
 * Update additonal fee by id
 * @param {ObjectId} locationId
 * @param {Object} additionalFeeId
 * @param {Object} updateBody
 * @returns {Promise<Location>}
 */
const updateAdditionalFeeById = async (locationId, additionalFeeId, updateBody) => {
    const location = await getLocationById(locationId);
    if (!location) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
    }
    let addtionalFee = location.additionalFee.find(value => value._id == additionalFeeId)
    if (addtionalFee == undefined) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Additional fee not found');
    }

    Object.assign(addtionalFee, updateBody);
    await location.save();
    return addtionalFee;
};

/**
 * Delete location by id
 * @param {ObjectId} locationId
 * @returns {Promise<Location>}
 */
const deleteLocationById = async (locationId) => {
    const location = await getLocationById(locationId);
    if (!location) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
    }
    await location.remove();
    return location;
};

/**
 * Delete additional fee by id
 * @param {ObjectId} locationId
 * @param {ObjectId} additionalFeeId
 * @returns {Promise<Location>}
 */
const deleteAdditionalFeeById = async (locationId, additionalFeeId) => {
    const location = await getLocationById(locationId);
    if (!location) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
    }
    location.additionalFee = location.additionalFee.filter(_additonalFee => {
        return _additonalFee._id != additionalFeeId && _additonalFee._id !== undefined;
    });

    await location.save()
    return location.additionalFee;
};

module.exports = {
    createProduct,
    queryLocations,
    getLocationById,
    updateLocationById,
    deleteLocationById,
    updateAdditionalFeeById,
    deleteAdditionalFeeById
};
