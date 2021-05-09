// required libraries
const express = require('express')
const bodyParser = require('body-parser')
var $ = require('jquery')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
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
//configure app
const app = express();

//model functions
const Category = require('./models/Category');
const Blog = require('./models/Blog');


//configuration app uses
app.set('view engine','ejs')
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static("static"))
app.use("/uploads", express.static("uploads"));
const blogRoutes = require('./routes/blog');
const categoryRoutes = require('./routes/category');


//Database config

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true  } )
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

// routes

app.use('/blogs',blogRoutes);

app.use('/category',categoryRoutes);



app.get('/',(req,res) => {
    Category.find((e,categories) => {
        if(e){
            res.send(e);
        } else{
            console.log(categories);
            res.render('index',{title: 'YoBlog',categoryList: categories});
        }
    });
})
app.get('/blog',(req,res) => {
    res.render('blog',{title: 'Blogs'})
})
app.get('/about',(req,res) => {
    res.render('about',{title: 'About'})
})
app.get('/contact',(req,res) => {
    res.render('contact',{title: 'Contact'})
})
app.get('/admin', (req,res) => {
    res.render('admin', {title: 'Admin Login'})
})
app.get('/dashboard', (req,res) => {
    Category.find((e,categories) => {
        if(e){
            res.send(e);
        } else{
            console.log(categories);
            Blog.find((e,posts) => {
                if(e){
                    res.send(e);
                } else{
                    res.render('admin/dashboard', {title: 'Dashboard', noOfCategory: categories.length, noOfBlog: posts.length});
                }
            });
            
        }
    });
})
app.get('/main-blog', (req,res) => {
    res.render('main-blog', {title: req.query.x})
})
app.get('/compose', (req,res) => {
    Category.find((e,categories) => {
        if(e){
            res.send(e);
        } else{
            console.log(categories);
            res.render('admin/addBlogs', {title: 'Compose', categoryList: categories});  
        }
    });
    
})
// app.post('/blog/store',(req,res) => {
//     console.log(req.body);
//     res.redirect('/')
// })
app.listen(process.env.PORT,() => {
    console.log(`app is running on http://localhost:${process.env.PORT}`)
})