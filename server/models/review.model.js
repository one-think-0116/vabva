const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const imagesSchema = mongoose.Schema(
    {
        image: {
            type: String
        }
    })
const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        rating: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            trim: true
        },
        comment: {
            type: String,
            trim: true
        },
        images: [imagesSchema],
        reply: [{
            comment: {
                type: String
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }],
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
            },
            reports: {
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
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

/**
 * @typedef Review
 */
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
