const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta =  require('./database/Resposta')

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
        Pergunta.findAll({ raw: true, order:[
        ['id','DESC']  //METODO DE ORDENAMENTO DAS PERGUNTAS  
    ]}).then(perguntas => {
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

    //RESPONDER
    app.get("/answer/:id",(req,res)=>{
        var id = req.params.id;
        Pergunta.findOne({
            where: {id: id} //busca na tabela um valor = variavel id
        }) //Metodo para pegar um unico dado
        .then(pergunta => { //mesmo que não ache nada ele recebe o valor undefined
            if(pergunta != undefined){ //Caso seja # de undefined ele resolve no if
                //CARREGA TODAS RESPOSTAS CORRESPONDENTES A ESSA PERGUNTA
                Resposta.findAll({
                        where: { perguntaId: pergunta.id },
                        order: [ ['id','DESC'] ]
                    }).then( respostas => {
                        //CARREGA PERGUNTAS E EXIBE MA TELA
                        res.render("answer",{
                            pergunta: pergunta, //passa a variavel pergunta para o front
                            respostas: respostas //passa as respostas para a view/front
                        })
                    });
            }else{
                // Não encontada | undefined
                res.redirect("/") //Caso não encontre uma pergunta o id X ele retorna para a rota raiz
            }
        })
    })

    app.post("/answers", (req,res) => {
        var corpo = req.body.corpo //name: corpo
        var perguntaId = req.body.pergunta //name: pergunta
        Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId
        }).then( () => {
            res.redirect('/answer/'+perguntaId)
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