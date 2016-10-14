// 각각의 모듈을 변수에 담는다.
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override"); //method-override 모듈을 methodOverride변수에 담습니다.
var app = express();

// DB setting
mongoose.connect('mongodb://ohgu:aca0901@ds023105.mlab.com:23105/first'); //DB접속 정보
var db = mongoose.connection; //db접속정보를 dv변수에 담는다.
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
app.use(methodOverride("_method")); //_method의 query로 들어오는 값으로 HTTP Method를 바꿉니다.
                                   //예를들어 http://example.com/category/id?_method=delete를 받으면 _method의 값인 delete을 읽어 해당 request의 HTTP method를 delete으로 바꿉니다.

// DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema);

// Routes
// Home
app.get("/", function(req, res){
  res.redirect("/contacts");
});
// Contacts - Index
app.get("/contacts", function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});
// Contacts - New
app.get("/contacts/new", function(req, res){
  res.render("contacts/new");
});
// Contacts - create
app.post("/contacts", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Contacts - show
app.get("/contacts/:id", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/show", {contact:contact});
 });
});

// Contacts - edit // 4
app.get("/contacts/:id/edit", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/edit", {contact:contact});
 });
});
// Contacts - update // 5
app.put("/contacts/:id", function(req, res){
 Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts/"+req.params.id);
 });
});
// Contacts - destroy // 6
app.delete("/contacts/:id", function(req, res){
 Contact.remove({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

// Port setting
app.listen(3000, function(){
  console.log("server on!");
});
