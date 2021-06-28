const express = require('express');

const ControllerCategories = express.Router();

const Category = require('./Category');

const Slugify = require('slugify'); // biblioteca q transforma uma string em uma slug(string em url)



ControllerCategories.get('/admin/categories/new',(req,res)=>{

    res.render("admin/categories/new.ejs");
});

//rota para salvar a categoria criada no banco  de  dados

ControllerCategories.post("/categories/save", (req,res)=>{
    var title = req.body.title;

    if(title != undefined)
    {
        Category.create(
            {
                title : title,
                slug : Slugify(title)
            }
        ).then(res.redirect("/"))

    }else{
        res.redirect("admin/categories/new");
    }


})

ControllerCategories.get("/admin/categories",(req,res)=>
{
    Category.findAll().then(categories =>{

        res.render("admin/categories/index.ejs",{categories: categories});
    })
    
   
})

ControllerCategories.post("/categories/delete",(req,res)=> //rota para deletar uma categoria. 
                                                            //Utiliza-se a função destroy do sequelize para deletar um objeto no bd caso os parametros sejam verdadeiros 
{
    var id = req.body.id;

    if(id !=undefined)
    {
        if(!isNaN(id))
        {
          Category.destroy({
              where: {
                  id : id 
              }
          }).then( ()=>
          {
              res.redirect("/admin/categories");
            })  
        }else{
            res.redirect("/admin/categories");
        }  

    }else{
        res.redirect("/admin/categories");
    }

})


ControllerCategories.get("/admin/categories/edit/:id",(req,res)=>{    
    var id = req.params.id;
    if(isNaN(id))
    {
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if(category !=undefined)
        {
            res.render("admin/categories/edit",{category : category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro =>{
        res.redirect("/admin/categories");
    })


})

ControllerCategories.post("/categories/update", (req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    

    Category.update({title : title ,  slug : Slugify(title)}, {
        where : {id : id }


    }).then( ()=>{res.redirect("/admin/categories"); })


})

module.exports = ControllerCategories;