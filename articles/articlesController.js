const express = require('express');

const ControllerArticles = express.Router();


ControllerArticles.get('/articles',(req,res)=>{

    res.send("Rotas anoitadas");
});



module.exports = ControllerArticles;