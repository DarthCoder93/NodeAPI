const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true,
    },
    orderItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'orderitem'
    }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
