const express = require('express');

const ControllerCategories = express.Router();


ControllerCategories.get('/admin/categories/new',(req,res)=>{

    res.render("admin/cadegories/new.ejs");
});



module.exports = ControllerCategories;