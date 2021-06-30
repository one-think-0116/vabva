
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { services } = require("../config/services")

const addressSchema = mongoose.Schema({
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
})

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

const serviceSchema = mongoose.Schema({
    type: {
        type: String,
        enum: services
    },
    start: {
        type: mongoose.Schema.Types.Date
    },
    end: {
        type: mongoose.Schema.Types.Date
    }
})

const orderSchema = mongoose.Schema(
    {
        user: {
            customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            referralId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        },
        userLocationName: {
            type: String,
            trim: true
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
        tax: [taxSchema],
        products: [{
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: {
                type: String,
                trim: true
            },
            variant: {
                selectedId: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null
                },
                selectedName: {
                    type: String,
                    default: null
                }
            },
            quantity: {
                type: Number
            },
            address: [addressSchema],
            service: [serviceSchema],
            paymentIntents: [{
                stripeIntentId: {
                    type: String
                }
            }],
            delivery: {
                estimateId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "DeliveryEstimate"
                },
                tracking: {
                    code: {
                        type: String,
                        trim: true
                    },
                    note: {
                        type: String,
                        trim: true
                    }
                }
            }
        }]

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




{

,
    "productDetail": {
        "productId": "PRODUCT_ID",
            "productName": "xxxxx",
                "selectedVariantId": "VARIANT_ID",
                    "quantity": "NUMBER_OF_QUANTITY_IF_APPLICABLE"
    }
}