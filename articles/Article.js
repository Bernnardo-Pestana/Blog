const Sequelize = require('sequelize');

const connection = require('../database/database');

const Category = require('../categories/Category');

const Articles = connection.define('Articles',
{

    title :{
        type: Sequelize.STRING,
        allowNull:false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull:false
    },
    body :
    {
        type: Sequelize.TEXT,
        allowNull: false
    }



});
//relacionamento de 1-p-N entre category e articles
Category.hasMany(Articles);

// esse metodo permite o relacionamento 1-p-1 entre articles e category
Articles.belongsTo(Category);




module.exports = Articles;