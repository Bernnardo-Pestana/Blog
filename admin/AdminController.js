const express = require('express');

const ControllerAdmin= express.Router();
const Admin = require("./Admin");


ControllerAdmin.get("admin/user",(req,res)=>
{



})

ControllerAdmin.get("/admin/user/create",(req,res)=>
{
    res.render("admin/user/create")

    
})

ControllerAdmin.post("/admin/create",(req,res)=>
{
  var email = req.body.email;
  var senha = req.body.password;

    
})



module.exports = ControllerAdmin ;