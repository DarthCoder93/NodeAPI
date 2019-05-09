var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var Brand = require('../models/brands')
const fs = require('fs');

const Multer = require('multer');
//configure mutler to temperary store the image in memory
const multer = Multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'dzh8no2pz',
    api_key: '474237379131719',
    api_secret: 'RXEVmeYkTJezz9IkV6lWkamSatg'
});


/* GET products listing. */
router.get('/', async function (req, res) {
    try {
        let products = await Product.find()
        res.status(200).send(products)
    } catch (ex) {
        return res.status(500).send("Error", ex.message)
    }
});

router.get("/:id", async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).send("The given id does not exist");
        console.log(product);
        return res.status(200).send(product);
    } catch (e) {
        return res.status(500).send("Error :", e.message)
    }
});

router.get("/simillerProducts/:id", async (req, res) => {
    try {
        //get product for the given id
        let product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).send("The given id does not exist");
        console.log(product);
        //get products for the given brand
        let products = await Product.find({ "brand": product.brand })
        return res.status(200).send(products);
    } catch (e) {
        return res.status(500).send("Error :", e.message)
    }
});

router.get("/byBrands/:id", async (req, res) => {
    try {
        //get products for the given brand
        let products = await Product.find({ "brand": req.params.id })
        return res.send(products);
    } catch (e) {
        return res.status(500).send("Error :", e.message)
    }
});

/* POST product */
router.post("/", multer.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.designedFor || !req.body.category) {
        res.status(400).send("Not all mandatory values are sent");
        return;
    }

    if (!req.file) {
        res.status(400).send("No Image Selected");
        return;
    }

    let imageUrl = ""

    try {
        //upload file to cloudinary
        let uploadedImage = await cloudinary.uploader.upload(req.file.path)
        //delete the temporery file after upload
        fs.unlinkSync(req.file.path);
        imageUrl = uploadedImage.url

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            imgUrl: imageUrl,
            price: req.body.price,
            discount: req.body.discount,
            designedFor: req.body.designedFor,
            category: req.body.category,
            brand: req.body.brand
        });

        try {
            let newProduct = await product.save();
            res.status(200).send(newProduct);
        } catch (e) {
            return res.status(500).send(e.message)
        }

    } catch (e) {
        res.status(500).send("Error :", e.message);
    }

});

router.put("/:id", async (req, res) => {
    // NOTE : This method only updates the likeCount property. Modify it to update everything. 
    if (!req.body.discount) {
      res.status(400).send({ messgae: "Not all mandatory values are sent" });
      return;
    }

    try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Given Id does not exit");

    product.set({discount: req.body.discount});
    product = await product.save();
    res.status(200).send(product);

    } catch(e){
        res.status(500).send(e.message)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let product = await Product.findByIdAndRemove(req.params.id);
        console.log(product);
        if (!product) return res.status(404).send("The given id does not exist");

        res.status(200).send(product);
    } catch (e) {
        res.status(500).send("Error : ", e.message);
    }
});


module.exports = router;
