const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')

//DATABASE
    connection
    .authenticate()
    .then(() => {
        console.log("Conexao realizada com sucesso")
    })
    .catch((err) => {
        console.log("Erro ao se conectar"+err)
    })

//VIEW ENGINE
    app.set('view engine','ejs') // view engine
    app.use(express.static('public')) //define o local dos arquivos estaticos
    // Body parser
    app.use(bodyParser.urlencoded({extended: false})) //decodifica dados enviados pelo formulario
    app.use(bodyParser.json()) //permite ler dados de formularios enviados via JSON

//ROUTES
    //Principal
    app.get('/',(req,res) => {
        Pergunta.findAll({ raw: true }).then(perguntas => {
            res.render('index',{
                perguntas: perguntas
            })
        })            
    })
        
    //Perguntas
        app.get('/ask',(req,res)=>{
            res.render('ask')
        })

    //Recebe dados dos formularios
        app.post("/salvarpergunta",(req,res)=>{
            var titulo = req.body.titulo
            var descricao = req.body.descricao
            Pergunta.create({ //Insere os Dados no banco de dados
                titulo: titulo,
                descricao: descricao
            }).then(() =>{
                res.redirect('/')
            })
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
    //OUTRAS