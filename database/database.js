const Sequelize = require('sequelize');

const connection = new Sequelize('blog','root','Txai1990', {

 host:'localhost',
 dialect:'mysql'
});


module.exports = connection;