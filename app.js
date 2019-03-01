//all dependencies and imports
var express = require('express');
var app = express()
var bodyParser = require('body-parser');

//presets configs
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.get('/',(req,res)=>{
    res.render('login');
})


//app listener
app.listen(4000,(req,res)=>{
    console.log('Hobbyist started');
})
