//routes/contacts.js

var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");

//Index
router.route("/")
.get(function(req,res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

// Contacts - New
router.get("/new", function(req, res){
  res.render("contacts/new");
});
// Contacts - create
router.post("/", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Contacts - show
router.get("/:id", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/show", {contact:contact});
 });
});

// Contacts - edit // 4
router.get("/:id/edit", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/edit", {contact:contact});
 });
});
// Contacts - update // 5
router.put("/:id", function(req, res){
 Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts/"+req.params.id);
 });
});
// Contacts - destroy // 6
router.delete("/:id", function(req, res){
 Contact.remove({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

module.exports = router;
