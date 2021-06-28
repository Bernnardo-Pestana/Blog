const Sequelize = require('sequelize');

const connection = require('../database/database');


const Admin = connection.define('Admin',
{

    Email :{
        type: Sequelize.STRING,
        allowNull:false
    },
    Senha: {
        type: Sequelize.STRING,
        allowNull:false
    }
})
Admin.sync({force:false});

module.exports = Admin;