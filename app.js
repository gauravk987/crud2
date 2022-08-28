var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var app = express();
var mongoose = require("mongoose");
var xyz = bodyParser.urlencoded();
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

mongoose.connect("mongodb://localhost:27017/mydb2");
var con = mongoose.connection;
var schema = mongoose.Schema({enroll:{
    type: String,
    unique: true,
    required: true
  },name:String,dept:String
});
var m1 = mongoose.model("model1",schema,"student");

app.get("/", (req, res) => {
    var mysort = { enroll: 1 };
    data2=[{enroll:101}];
    m1.find(function(err,data){
    data2 = data;
    res.send(data2);
    }).sort(mysort);
});
app.get("/add",(req,res)=>{
    var row = new m1(req.query);
    row.save(function(err,result){
        if(result)
        res.send(true);
        else
        res.send(false);
    });
});
app.get("/delete",(req,res)=>{
    m1.deleteMany(req.query,function(err,result){
        if(result)
        res.send(true);
        else
        res.send(false);
    });
});
app.get("/edit",(req,res)=>{
    m1.updateMany({enroll : req.query.enroll},
        {$set:{name:req.query.name,dept:req.query.dept}},
        function(err,result){
            if(result)
            res.send(true);
            else
            res.send(false);
        });
});

