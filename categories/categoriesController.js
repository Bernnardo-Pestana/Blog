const express = require('express');

const ControllerCategories = express.Router();

const Category = require('./Category');

const Slugify = require('slugify'); // biblioteca q transforma uma string em uma slug(string em url)



ControllerCategories.get('/admin/categories/new',(req,res)=>{

    res.render("admin/cadegories/new.ejs");
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
        res.redirect("admin/cadegories/new");
    }


})



module.exports = ControllerCategories;