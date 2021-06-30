
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
    {
        stripeCarId: {
            type: String,
            trim: true,
            required: true
        },
        stripeCustomerId: {
            type: String,
            trim: true,
            required: true
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        },
        expirey: {
            month: {
                type: String,
                trim: true
            },
            year: {
                type: String,
                trim: true
            }
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        last4: {
            type: String
        },
        brand: {
            type: String,
            trim: true
        },
        cvc_check: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;


