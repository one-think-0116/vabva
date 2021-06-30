const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const imagesSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        }
    })

const descriptionSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    images: {
        banner: [imagesSchema],
        sqaure: [imagesSchema]
    }
})

const categorySchema = mongoose.Schema(
    {
        path: {
            type: [{
                type: String,
                trim: true,
                lowercase: true,
                defualt: "Untitled",
            }]
        },
        description: {
            type: [descriptionSchema],
            required: true
        },
        fee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fee",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;