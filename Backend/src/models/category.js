const { Schema, model } = require('mongoose');

const CategorySchema = new Schema ({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    categoryPicture: { type: String },
    parentId: {
        type: String
    }

}, {timestamps: true});


module.exports = model("Category", CategorySchema);


