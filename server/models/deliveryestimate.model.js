
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deliveryEstimateSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
deliveryEstimateSchema.plugin(toJSON);

/**
 * @typedef DeliveryEstimate
 */
const DeliveryEstimate = mongoose.model('DeliveryEstimate', deliveryEstimateSchema);

module.exports = DeliveryEstimate;


