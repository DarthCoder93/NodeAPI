const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    discount: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    }, 
    discountedPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderItem = mongoose.model("orderitem", orderItemSchema);

module.exports = OrderItem;
