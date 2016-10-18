// 각각의 모듈을 변수에 담는다.
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override"); //method-override 모듈을 methodOverride변수에 담습니다.
var app = express();

// DB setting
mongoose.connect('mongodb://ohgu:aca0901@ds023105.mlab.com:23105/first'); //DB접속 정보
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home")); //1
app.use("/contacts", require("./routes/contacts")); //2

// Port setting
app.listen(3000, function(){
 console.log("server on!");
});
