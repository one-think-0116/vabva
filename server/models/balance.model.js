const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const balanceSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [{
            balance: {
                type: Number,
                default: 0,
                required: true
            },
            type: {
                type: String,
                enum: ["withdraw", "credit"],
                required: true
            },
            status: {
                type: String,
                enum: ["pending", "complete", "canceled"],
                required: true
            },
            description: {
                type: String,
                trim: true,
                require: true
            }
        }]
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
balanceSchema.plugin(toJSON);
balanceSchema.plugin(paginate);

/**
 * @typedef Balance
 */
const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;

