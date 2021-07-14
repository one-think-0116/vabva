
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const taxSchema = mongoose.Schema({
    taxNumber: {
        type: String,
        trim: true
    },
    country_code: {
        type: String,
        trim: true,
        minlength: 2,
        validate(value) {
            if (!validator.isISO31661Alpha2(value)) {
                throw new Error('Invalid ISO 3166 country code');
            }
        }
    }
})

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userLocationName: {
            primary: {
                type: String,
                trim: true
            },
            secondary: {
                type: String,
                trim: true
            }
        },
        userLocation: {
            type: {
                type: String,
                enum: ['Point'],
                defualt: "Point",
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        tax: {
            customer: taxSchema,
            business: taxSchema
        },
        parentOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        paymentIntents: [{
            stripeIntentId: {
                type: String
            }
        }],
        orderDetails: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetails"
        }],
        cost: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;