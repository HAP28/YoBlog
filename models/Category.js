const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
});

module.exports = mongoose.model('Category',CategorySchema);