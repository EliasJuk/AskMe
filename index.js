const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database')
const perguntaModel = require('./database/Pergunta')

//VIEW ENGINE
    app.set('view engine','ejs') // view engine
    app.use(express.static('public')) //define o local dos arquivos estaticos
    app.use(bodyParser.urlencoded({extended: false})) //decodifica dados enviados pelo formulario
    app.use(bodyParser.json()) //permite ler dados de formularios enviados via JSON

//ROUTES
    app.get('/',(req,res)=>{
        res.render('index')
    })

    app.get('/ask',(req,res)=>{
        res.render('ask')
    })

    app.post("/salvarpergunta",(req,res)=>{
        var titulo = req.body.titulo
        var descricao = req.body.descricao
        res.send('Formulario Recebido - Titulo: '+titulo+' Descricao: '+descricao)
    })

//CONFIG
    //SERVER - Rodando na porta 8081
        app.listen(8081,(err)=>{
            if(err){
                Console.log('Erro'+err)
            }else{
                console.log('Rodando na porta 8081')
            }
        })
    //DATABASE
        connection
            .authenticate()
            .then(() => {
                console.log("Conexao realizada com sucesso")
            })
            .catch((err) => {
                console.log("Erro ao se conectar"+err)
            })
    //OUTRAS