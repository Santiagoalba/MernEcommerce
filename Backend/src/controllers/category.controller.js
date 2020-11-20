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

            const categoryList = createCategory(categories);

            res.status(200).json({ categoryList });
        }
    });
}

function createCategory(categories, parentId = null){
    const categoryList = [];
    let category;
    if (parentId == null){
        category = categories.filter(cat => cat.parentId == null)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for(cate of category){
        console.log(cate, "la cate");
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategory(categories, cate._id)
        });
    }

    return categoryList;
}



module.exports = categoryCtrl;