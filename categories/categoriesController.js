const express = require('express');

const ControllerCategories = express.Router();


ControllerCategories.get('/categories',(req,res)=>{

    res.send("Rotas amanhecidas");
});



module.exports = ControllerCategories;