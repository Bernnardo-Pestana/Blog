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

        }).then( () =>{

            res.redirect("/admin/articles");

        })
    }else{
        res.redirect("/admin/articles");
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


ControllerArticles.get("/admin/articles/edit/:id",(req,res)=>{    
    var id = req.params.id;

    Article.findByPk(id).then(article => {
        if(article !=undefined)
        {
            Category.findAll().then(categories =>{
                res.render("admin/articles/edit",{categories : categories,article : article });
            })
           
        }else{
            res.redirect("/admin/articles");
        }
    }).catch(erro =>{
        res.redirect("/admin/articles");
    })


})


ControllerArticles.post('/articles/update',(req,res)=>{

    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
  
    var category = req.body.category ;

     console.log("o titulo eh : " 
     + title);
 
    if(title != undefined)
    {
        Article.update({

            title : title,
            body : body,
            categoryId : category,
            slug :  Slugify(title),
            

            where: { id: id}
        }).then( () =>{

            res.redirect("/admin/articles");

        })
    }else{
        res.redirect("/admin/articles");
    }

       
});


ControllerArticles.get("/articles/page/:num",(req,res)=>{
    var page = req.params.num;


    if(isNaN(page) || page == 1){
        var offset = 0;
    }else{
        var offset =( parseInt(page) - 1 )*4;
    }
    Article.findAndCountAll(
        {limit: 4,

         offset:offset
     }
    ).then(articles => {

        var next;
        if(offset + 4 >= articles.count)
        {
            next = false;
        }else{
            next = true;
        }


        var result = {articles : articles , next:next, page :  parseInt(page) }

        Category.findAll().then(categories=>{
            res.render("admin/articles/page",{result: result, categories : categories })
        })
        

    })


})

module.exports = ControllerArticles;