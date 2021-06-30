
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productBasketSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        selectedVariant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedQuantity: {
            type: Number
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

        locationName: {
            type: String,
            trim: true
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
 * @typedef Basket
 */
const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;


