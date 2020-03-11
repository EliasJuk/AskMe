const Sequilize = require('sequelize')

const connection = new Sequilize('askme', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection