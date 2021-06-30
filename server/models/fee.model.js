
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const feeSchema = mongoose.Schema(
    {

        amount: {
            type: Number,
            enum: ["fixed", "percentage"],
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
feeSchema.plugin(toJSON);

/**
 * @typedef Fee
 */
const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;


