var express = require('express');
var router = express.Router();
var Order = require('../models/order')
var OrderItem = require('../models/orderItem')
var { isAuthnticated } = require('../auth')

/* GET orders */
router.get('/', async function (req, res) {
    try {
        let order = await Order.find()
        res.status(200).send(order)
    } catch (ex) {
        return res.status(500).send("Error", ex.message)
    }
});

router.get("/byUserId:id", async (req, res) => {
    let userId = req.parms.id

    if (!userId || userId == "") {
        return res.status(400).send("User Id not found")
    }

    try {
        let orders = await Order.find({ userId: userId })
        if (!orders) return res.status(404).send("No orders for give ID");
        return res.send(product);
    } catch (e) {
        return res.status(500).send("Error : ", e.message)
    }

});


/* POST product */
router.post("/", async (req, res) => {

    if (!req.body.userId) {
        return res.status(400).send("User Id is required")
    }

    if (!req.body.total) {
        return res.status(400).send("total is required")
    }

    try {
        //save order items to the database
        let orderItems = req.body.orderItems
        let savedItems = await OrderItem.insertMany(orderItems)

        var itemIds = []

        //get the ids of saved order items
        savedItems.forEach(item => {
            itemIds.push(item._id)
        });

        let order = new Order({
            userId: req.body.userId,
            total: req.body.total,
            orderItems: itemIds
        });
 
        let newOrder = await order.save();

        res.status(200).send(newOrder);
    } catch (e) {
        return res.status(500).send(e.message)
    }

});


module.exports = router;
