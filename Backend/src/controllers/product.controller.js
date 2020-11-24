productCtrl = {};
const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');

productCtrl.create = (req, res) => {

    const { name, price, description, category, quantity } = req.body;
    // res.status(200).json({ file: req.files, body: req.body });

    let productPictures = []

    if(req.files.length > 0){
       productPictures = req.files.map(picture => {
            return { img: picture.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(req.body.name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id
    })

    product.save((error, product) => {
        if(error) return res.status(400).json({ error })
        if(product) {
            res.status(200).json({ product })
        }
    })
        

    }



module.exports = productCtrl;