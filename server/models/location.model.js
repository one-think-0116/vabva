const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { services, costTypes } = require('../config/services');


const geometrySchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['Polygon'],
            default: "Polygon"
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    }
)

const additionalFeeSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: services,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cost: {
            type: {
                required: true,
                enum: costTypes
            },
            amount: {
                type: Number,
                required: true
            }
        }
    }
)

const locationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        },
        locationName: {
            type: String,
            default: "Untitled",
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            unique: false,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        geometry: {
            type: geometrySchema,
            index: "2dsphere"
        },
        additionalFee: [{ type: additionalFeeSchema }]
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

/**
 * @typedef Location
 */
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
