var express = require('express');
var router = express.Router();
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


/* GET brands listing. */
router.get('/', async function (req, res) {
    try {
        let brands = await Brand.find()
        res.send(brands)
    } catch (ex) {
        return res.status(500).send("Error", ex.message)
    }
});

/* POST brand */
router.post("/", multer.single('image'), async (req, res) => {
    if (!req.body.name) {
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
    } catch (e) {
        console.log(e)
    }

    let brand = new Brand({
        name: req.body.name,
        imgUrl: imageUrl
    });

    try {
        let newBrand = await brand.save();
        res.status(200).send(newBrand);
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

router.delete("/:id", async (req, res) => {
    let product = await Product.findByIdAndRemove(req.params.id);
    console.log(product);
    if (!product) return res.status(404).send("The given id does not exist");

    res.send(product);
});


module.exports = router;
