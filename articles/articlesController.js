const express = require('express');

const ControllerArticles = express.Router();

const Category = require("../categories/Category")

const Article = require("./Article");

const Slugify = require('slugify'); // biblioteca q transforma uma string em uma slug(string em url)


ControllerArticles.get('/admin/articles',(req,res)=>{

    Article.findAll({
        include: [ {model: Category}]
    }).then((articles)=> {
        res.render("admin/articles/index.ejs",{articles : articles});
    })

   
});

ControllerArticles.get('/admin/articles/new',(req,res)=>{

    Category.findAll().then(categories=>{


        res.render("admin/articles/new.ejs",{categories :categories});
    })
   
   
});



ControllerArticles.post('/articles/save',(req,res)=>{

    var title = req.body.title;
    var body = req.body.body;
    var id = req.body.id; 

    if(title != undefined)
    {
        Article.create({

            title : title,
            body : body,
            slug :  Slugify(title),
            categoryId : id

        }).then( (req,res) =>{

            res.redirect("admin/articles/new.ejs");

        })
    }else{
        res.redirect("admin/articles/new.ejs");
    }

       
});



ControllerArticles.post("/articles/delete",(req,res)=> //rota para deletar uma categoria. 
                                                            //Utiliza-se a função destroy do sequelize para deletar um objeto no bd caso os parametros sejam verdadeiros 
{
    var id = req.body.id;

    if(id !=undefined)
    {
        if(!isNaN(id))
        {
          Article.destroy({
              where: {
                  id : id 
              }
          }).then( ()=>
          {
              res.redirect("/admin/articles");
            })  
        }else{
            res.redirect("/admin/articles");
        }  

    }else{
        res.redirect("/admin/articles");
    }

})




module.exports = ControllerArticles;