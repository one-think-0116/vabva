
const mongoose = require('mongoose');
const { validator } = require('validator');
const { toJSON, paginate } = require('./plugins');

const taxIdSchema = mongoose.Schema(
    {
        country_code: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isISO31661Alpha2(value)) {
                    throw new Error('Invalid ISO 3166 country code');
                }
            }
        },
        amount: {
            type: Number,
            default: 0
        },
        localName: {
            type: String,
            trim: true
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
taxIdSchema.plugin(toJSON);


/**
 * @typedef TaxId
 */
const TaxId = mongoose.model('TaxId', taxIdSchema);

module.exports = TaxId;


