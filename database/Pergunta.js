const Sequelize = require('sequelize')
const connection = require('./database')

//MODEL
    const Pergunta = connection.define('perguntas',{ //Conexao e nome da tabela
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    })
    
//CRIA A TABELA NO BANCO
    Pergunta.sync({force: false}) //Nao força a criação da tabela caso ela já exista
        .then(()=>{})