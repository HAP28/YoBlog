const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

const Blog = require('../models/Blog');
const Category = require('../models/Category');
// router.post('/',upload.single('img'), (req, res) => {
//     console.log(req.file);

//    //removed the rest of the code to keep it simple. req.file here is always undefined.

// });

router.route('/')
.get((req,res) => {
    Blog.find((e,posts) => {
        if(e){
            res.send(e);
        } else{
            res.render('admin/blog',{title: 'Blogs', blogs: posts});
            // res.redirect('/blogs')
            console.log('Fetched every docs');
        }
    });
})
.post(upload.single('img'),(req,res) => {
    // console.log(req.file);
    // console.log(req);
    // res.redirect('/');
    const post = new Blog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        img: req.file.path
    });
    console.log(post);
    post.save((e) => {
        if(e){
            console.log(e);
        } else{
            Category.updateOne(
                {_id: req.body.category},
                { $push: { blogs: post } },
                (e) => {
                    if(e){
                        console.log(e);
                    } else{
                        res.redirect('/blogs');
                        console.log('inserted');
                    }
                }
            )
        }
    });
})
.delete((req,res) => {
    Blog.deleteMany((e) => {
        if(e){
            res.send(e);
        }else{
            res.send('Successfully Deleted!!');
        }
    });
});

///////////////////////    SPECIFIC ROUTES    /////////////////////

router.route('/:postTitle')
.get((req,res) => {
    Blog.deleteOne({title: req.params.postTitle},(e) => {
        if(e){
            res.send(e);
        } else{
            res.redirect('/blogs')
        }
    });
})
.put(upload.single('img'),(req,res) => {
    Blog.update(
        {title: req.params.postTitle},
        {title: req.body.title, description: req.body.description, img: req.file.path},
        {overwrite: true},
        (e) => {
            if(!e){
                res.send('Update SuccessFully');
            } else{
                res.send(e);
            }
        } 
    );
})
.patch((req,res) => {
    Blog.updateOne(
        {title: req.params.postTitle},
        {$set: req.body},
        (err) => {
            if(!err){
                console.log('updated');
                res.send('Successfully updated')
            } else{
                res.send(err)
            }
        }
    )
})
.delete((req,res) => {
    Blog.deleteOne(
        {title:req.params.postTitle},
        (e) => {
            if(!e){
                console.log('deleted post' + req.params.postTitle)
            } else{
                res.send('Record Not found');
            }
        }
    );
});
module.exports = router;