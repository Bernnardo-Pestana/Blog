// Importação de funções
const express = require('express');
const connection = require('./database/database');
const app = express();

const ControllerCategories = require('./categories/categoriesController')

const ControllerArticles = require('./articles/articlesController')

const bodyparser = require('body-parser');

//carregar a view ejs

app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Models
const Category = require('./categories/Category');
const Articles = require('./articles/Article');

// conexao ao banco de dados

connection
    .authenticate()
    .then(()=> {
        console.log("conexao feita");
    })
    .catch((erro)=>{console.log(erro)});



 //rotas 

app.use('/',ControllerCategories);
app.use('/',ControllerArticles);

app.get('/',(req,res)=>
{
    Articles.findAll()
    .then( articles => {

        Category.findAll().then(categories =>{
            res.render("index.ejs",{ articles: articles, categories : categories});
        })
    }).catch(err =>{  res.redirect('/');})

})


app.get("/:slug", (req,res)=>{
    
    var slug = req.params.slug;

    Articles.findOne ({
        where : { slug : slug}

    }).then( articles => {

        Category.findAll().then(categories =>{
            res.render("article.ejs",{ articles: articles, categories : categories});
        })
    }).catch(err =>{  res.redirect('/');})


})




app.get("/category/:slug", (req,res)=>{
    
    var slug = req.params.slug;

    Category.findOne ({
        where : { slug : slug} , include :[{ model : Articles}]

    }).then( category => {

        if(category != undefined)
        {
            Category.findAll().then(categories =>{
                console.log( category.articles);

                res.render("index.ejs",{  articles: category.articles, categories : categories });
            })
        }else{
            res.redirect('/');
        }
    }).catch(err =>{  res.redirect('/');})


})



app.listen(8888, ()=>{console.log("funcionando")});