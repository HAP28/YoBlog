const mongoose = require('mongoose');
const CategorySchema = require('./Category');
const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: { 
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

module.exports = mongoose.model('Blog',BlogSchema);