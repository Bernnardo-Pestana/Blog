const express = require('express');

const ControllerAdmin= express.Router();
const Admin = require("./Admin");

const bcrypt = require("bcryptjs"); // hash-code e salt para senhas de usuarios


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

//procura saber se o email ja foi cadastrado
  Admin.findOne({where : {email : email}}).then(user=>{
    if(user == undefined){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

      Admin.create({
        email : email,
        password : hash
      }).then(()=>{
        res.redirect("/");
      }).catch((err)=>{
        res.redirect("/");
      })
    }else{
      res.redirect("/admin/user/create");
    }
  })

  
    
})



module.exports = ControllerAdmin ;