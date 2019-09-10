let express = require('express');
let mongoose= require('mongoose');
let app=express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


let bodyparser =require("body-parser");
app.use(bodyparser.urlencoded({extended:false}));


//open db connection
let url='mongodb://localhost:27017/taskDB';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true },function(err){
    if(err){
        console.log(err);
        throw err;
    }
});
//import models
let developer= require("./models/developer");
let task =require("./models/task");

app.use(express.static('img'));
app.use(express.static('css'));
var filePath=__dirname+"/views/";

app.get('/', function (rqe, res) {
    let fileName =filePath+"index.html";
    res.sendFile(fileName);
});

app.get('/addnew', function (rqe, res) {
    let fileName =filePath+"addnew.html";
    res.sendFile(fileName);
});
//list
app.get('/list',function(req,res){
    task.find().exec(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('listall.html', { mydata: data });

        }
    })
});
//list developer
app.get('/listdeveloper',function(req,res){
    developer.find().exec(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('listdeveloper.html', { mydata: data });

        }
    })
});
//add developer
app.get('/newdeveloper', function (rqe, res) {
    let fileName =filePath+"newdeveloper.html";
    res.sendFile(fileName);
});
//add
app.post('/add', function (req, res) {
    let data =req.body;
    task.create({
        _id: new mongoose.Types.ObjectId(),
        name: data.name, 
        assign: data.assign, 
        due: data.due,
        status:data.status,
        desc:data.desc
    },function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/list");
        }
    });
});
//add developer
app.post('/newdeveloper', function (req, res) {
    let data =req.body;
    developer.create({
        _id: new mongoose.Types.ObjectId(),
        name:{
            firstname: data.firstname, 
            lastname:data.lastname,
        },
        level:data.level,
        address:{
            state:data.state,
            suburb:data.suburb,
            street:data.street,
            unit:data.unit
        }
    },function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/listdeveloper");
        }
    });
});
//delete
app.get('/delete', function (req, res) {
    let fileName =filePath+"delete.html"
    res.sendFile(fileName);
});

app.post('/deleteone', function (req, res) {
    task.deleteOne({_id: req.body._id},function(err,doc){
        //console.log(doc);

    });
    res.redirect('/list');// redirect the client to list users page
});
//update
app.get('/update', function (req, res) {
    let fileName =filePath+"update.html"
    res.sendFile(fileName);
});
app.post('/updateone', function (req, res) {
    let theUpdate = { $set: { status: req.body.status }};
    task.updateOne({_id: req.body._id}, theUpdate,function(err,doc){
        //console.log(doc);
    });
    res.redirect('/list');// redirect the client to list users page
});
//deleteall

app.get('/deleteall', function (req, res) {
    task.deleteMany({status: 'Complete'},function(err) {});
    res.redirect('/list');// redirect the client to list users page
});
app.listen(8080);