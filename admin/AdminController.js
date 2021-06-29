const express = require('express');

const ControllerAdmin= express.Router();
const Admin = require("./Admin");

const bcrypt = require("bcryptjs"); // hash-code e salt para senhas de usuarios


ControllerAdmin.get("/admin/user",(req,res)=>
{
  Admin.findAll().then(users=>{

    res.render("admin/user/index.ejs",{users: users})

  })


})

ControllerAdmin.get("/admin/user/create",(req,res)=>
{
    res.render("admin/user/create")

    
})

ControllerAdmin.post("/admin/create",(req,res)=>
{
  var email = req.body.email;
  var senha = req.body.senha;

  console.log("a senha ej : " + senha); 

//procura saber se o email ja foi cadastrado
  Admin.findOne({where : {email : email}}).then(user=>{
    if(user == undefined){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

      Admin.create({
        Email : email,
        Senha : hash
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


ControllerAdmin.get("/admin/user/login",(req,res)=>{
    res.render("admin/user/login");
})

ControllerAdmin.post("/admin/login",(req,res)=>{
  var email= req.body.email;
  var senha= req.body.senha;
  
    Admin.findOne({where:{Email : email}}).then(user=>{
      if(user != undefined){

        var correct = bcrypt.compareSync(senha, Admin.Senha);
        
        if(correct)
        {
          req.session.user = {id: Admin.id,
                             email: Admin.Email}
        }else{
          res.redirect("/admin/user/login");
        }

      }else{
        res.redirect("/admin/user/login");
      }


    })

})

ControllerAdmin.get("/logout",(req,res)=>{
  req.session.user = undefined;

  res.redirect("/");
})



module.exports = ControllerAdmin ;