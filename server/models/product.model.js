const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { services, costTypes } = require('../config/services');

const imagesSchema = mongoose.Schema(
    {
        image: {
            type: String
        }
    })
const descriptionSchema = mongoose.Schema(
    {
        text: {
            type: String,
            trim: true
        },
        facts: {
            type: [{
                type: String,
                trim: true
            }],
        },
        images: {
            type: [imagesSchema]
        }
    })

const costSchema = mongoose.Schema({
    type: {
        type: String,
        enum: costTypes
    },
    amount: {
        type: Number
    },
    minimum: {
        days: {
            type: Number
        }
    },
    discount: {
        type: {
            type: String,
            enum: costTypes
        },
        amount: {
            type: Number
        }
    },
    additional: [{
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            enum: costTypes
        },
        amount: {
            type: Number
        },
        mandatory: {
            type: Boolean
        }
    }],
    sample: {
        type: Number
    }
})

const variationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        items: [{
            colour: {
                type: String
            },
            quantity: {
                type: Number,
                defualt: 0
            },
            cost: {
                type: Number
            },
            images: {
                type: [imagesSchema]
            }
        }]
    })


const questionSchema = mongoose.Schema(
    {
        question: {
            type: String,
            trim: true
        },
        answer: {
            type: String,
            trim: true
        },
        statistics: {
            likes: {
                total: {
                    type: Number,
                    defualt: 0
                },
                userId: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }]
            }
        }
    })

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

//add product reference
const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            trim: true,
            default: "Untitled"
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        service: {
            type: String,
            enum: services
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location"
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        reviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
        estimatedDeliveryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliverySchema"
        },
        description: {
            type: descriptionSchema
        },
        cost: {
            type: costSchema
        },
        variation: {
            type: [variationSchema]
        },
        stock: {
            quantity: {
                type: Number,
                defualt: 0
            }
        },
        questions: {
            type: [questionSchema]
        },
        summary: {
            price: {
                type: Number,
                default: 0
            },
            priceAdditions: {
                type: Number,
                defualt: 0
            },
            purchaseCount: {
                type: Number,
                defualt: 0
            },
            totalReviewRating: {
                type: Number,
                defualt: 0
            },
            geometry: {
                type: geometrySchema,
                index: "2dsphere"
            }
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
