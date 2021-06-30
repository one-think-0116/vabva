
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const addressSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        displayName: {
            type: String,
            default: "Untitled",
            trim: true
        },
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        },
        mobile: {
            type: String,
            trim: true,
            validator(value) {
                if (!validator.isMobile(value, "any")) {
                    throw new Error('Invalid mobile');
                }
            }
        },
        address_line1: {
            type: String,
            trim: true,
            required: true
        },
        address_line2: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        postal_code: {
            type: String,
            required: true,
            trim: true
        },
        country_code: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            validate(value) {
                if (!validator.isISO31661Alpha2(value)) {
                    throw new Error('Invalid ISO 3166 country code');
                }
            }
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);

/**
 * @typedef Address
 */
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;


