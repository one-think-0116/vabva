
const mongoose = require('mongoose');
const { services, productOptionIdTypes } = require('../config/services');
const { toJSON, paginate } = require('./plugins');

const productBasketSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        selectedIdType: {
            type: String,
            enum: productOptionIdTypes,
            required: true
        },
        selectedId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            min: [1, "Quantity must be more than 1"],
            required: true
        },
        service: {
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
        }
    }
)
const basketSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        locationName: {
            primary: {
                type: String,
                required: true,
                trim: true
            },
            secondary: {
                type: String,
                required: true,
                trim: true
            }
        },
        location: {
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
        products: [productBasketSchema]
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
basketSchema.plugin(toJSON);

/**
* Check if password matches the user's password
* @param {string} password
* @returns {Promise<boolean>}
*/
basketSchema.statics.isBasketExists = async function (userId) {
    const basket = await this.findOne({ userId })
    return !!basket
};


/**
 * @typedef Basket
 */
const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;


