const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.route('/')
.get((req,res) => {
    Category.find((e,categories) => {
        if(e){
            res.send(e);
        } else{
            console.log(categories);
            res.render('admin/category',{title: 'Category', categoryList: categories});
            console.log('Fetched every docs');
        }
    });
})
.post((req,res) => {    
    const category = new Category({
        category: req.body.category,
    });
    console.log(category);
    category.save((err) => {
        if(err){
            console.log(err);
        } else{
            res.redirect('/category');
            console.log('inserted');
        }
    });
});

router.route('/delete')
.post((req,res) => {
    console.log(req.body);
    Category.deleteOne({_id:req.body.category},(e) => {
        if(e){
            res.send(e);
        }else{
            console.log('Successfully Deleted!!');
            res.redirect('/category');
        }
    });
});

module.exports = router;