const Sequilize = require('sequelize')

const connection = new Sequilize('askme', 'root', null,{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection