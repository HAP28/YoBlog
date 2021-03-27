// required libraries
const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const array = [1]
//configure app
const app = express();

//configuration app uses
app.set('views',__dirname + '/views');
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("static"))

// routes
app.get('/',(req,res) => {
    res.render('index',{title: 'Blooger'})
})
app.get('/blogs',(req,res) => {
    res.render('blog',{title: 'Blogs'})
})
app.get('/about',(req,res) => {
    res.render('about',{title: 'About'})
})
app.get('/contact',(req,res) => {
    res.render('contact',{title: 'Contact'})
})

app.listen(process.env.PORT,() => {
    console.log(__dirname + '/views');
    console.log(`app is running on http://localhost:${process.env.PORT}`)
})