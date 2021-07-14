
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const reorderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderDetailsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetails"
        },
        schedule: {
            dayOfWeek: {
                type: String,
                enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            },
            dayOfMonth: {
                type: Number,
                min: [1, "Please choose a valid day in the month"],
                max: [28, "Please choose a valid day in the month, upto 28 days."]
            },
            repeat: {
                type: String,
                enum: ["weekly", "monthly"],
                required: true
            }
        },
        lastOrdered: {
            type: Date
        },
        reorderLastChecked: {
            type: Date
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
reorderSchema.plugin(toJSON);

/**
 * @typedef Reorder
 */
const Reorder = mongoose.model('Reorder', reorderSchema);

module.exports = Reorder;


