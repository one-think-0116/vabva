
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { services, costTypes, productOptionIdTypes } = require("../config/services")

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

/**
 * Options can be:
 * - additional cost add in location, for this location (mandatory)
 * - additional costs added in product (mandatory or optionally selected by the user)
 * - A selected variant
 * 
*/
const optionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        mandatory: {
            type: Boolean,
            defualt: false
        },
        type: {
            type: String,
            enum: costTypes,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        quantity: {
            type: Number,
            min: [1, "Quantity must be more than 1"],
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
        }
    }
)
const orderSchema = mongoose.Schema(
    {
        users: {
            customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                index: true
            },
            businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                index: true
            },
            referralId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                index: true
            },
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            index: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            index: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            index: true
        },
        address: [addressSchema],
        service: {
            type: serviceSchema,
            index: true
        },
        refund: {
            balance: {
                type: Number,
                default: 0
            },
            transactions: [{
                balance: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    trim: true,
                    require: true
                }
            }]
        },
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
        },
        cost: {
            options: [optionSchema],
            tax: {
                type: Number,
                defualt: 0,
                required: true
            },
            categoryFee: {
                type: Number,
                defualt: 0,
                required: true
            },
            referralFee: {
                type: Number,
                defualt: 0
            },
            total: {
                type: Number,
                defualt: 0,
                required: true
            }
        }
    },
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * Total number of given productId which has been booked, between two date ranges, or multilpe seperate dates.
 * @param {string} [productId] - The productId arrays
 * @param {Date} [dates] - array of dates. Example: [10th], [17th], [18th]
 * @returns {Promise<Number>}
 */
orderSchema.statics.available = async function (productId, dates) {

    let serviceStartEnd = dates.map(x => {
        const _date = {
            "products.service.start": {
                $lte: (new Date(x))
            },
            "products.service.end": {
                $gte: (new Date(x)),
            }
        }
        return _date;
    })
    let _query = {
        "products.productId": { $in: productId },
        $and: serviceStartEnd
    }


    const booked = await this.aggregate(
        [

            {
                $match: _query
            },
            {
                $unwind: "$products"
            },

            {
                $match: _query
            }
            // {
            //     $group: {
            //         _id: "$products", //null
            //         // productsId: { $push: "$products" }
            //     }
            // },
            // {
            //     $match: {
            //         "products.productId":{$in: ["60dd241bed1159c20d907563"]}
            //     }
            // }
        ]
    )
    //query, { "products.$": {$in: productId}} /*user: 1, userLocationName: 1, userLocation: 1, tax: 1, _id: 1 }*/);

    console.log(JSON.stringify(booked.length))
    // return booked;
}

/**
 * @typedef OrderDetails
 */
const OrderDetails = mongoose.model('OrderDetails', orderSchema);

// Order.available([mongoose.Types.ObjectId("60dd241bed1159c20d907563"), mongoose.Types.ObjectId("60dd241bed1159c20d907564")], ["2021-07-14T02:35:10.167+0000"])

module.exports = OrderDetails;