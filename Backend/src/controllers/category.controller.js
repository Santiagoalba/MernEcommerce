categoryCtrl = {};
const Category = require('../models/category');
const slugify = require('slugify');

categoryCtrl.create = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error });
        if(category) {
            return res.status(201).json({ category })
        }
    })

}

categoryCtrl.getCategories = (req, res) => {
    Category.find()
    .exec((error, categories) => {
        if(error) return res.status(400).json({error});

        if(categories){
            res.status(200).json({categories});
        }
    });
}



module.exports = categoryCtrl;