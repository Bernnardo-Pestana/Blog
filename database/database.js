const Sequelize = require('sequelize');

const connection = new Sequelize('blog','root','Txai1990', {

 host:'localhost',
 dialect:'mysql',
 timezone: '-03:00'
});


module.exports = connection;