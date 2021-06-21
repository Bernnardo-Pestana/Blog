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
    res.render("index.ejs");
})


app.listen(8888, ()=>{console.log("funcionando")});