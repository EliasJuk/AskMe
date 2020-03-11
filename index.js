const express = require('express')
//const mysql = require('mysql')
const app = express()

//VIEW ENGINE
    app.set('view engine','ejs') //view engine
    app.use(express.static('public')) //define o local dos arquivos estaticos

//ROUTES
    app.get('/',(req,res)=>{
        res.send("DIGITE /NOME na URL")
    })

    app.get('/:nome',(req,res)=>{
        let nome = req.params.nome
        //var nome = "Elias Juk"
        let lang = "JavaScript"
        let exibirMsg = true;
        
        var produtos = [
            {nome: "Doritos", preco: 3.50},
            {nome: "Coca-cola", preco: 3.80},
            {nome: "Leite", preco: 1.50},
            {nome: "Carne", preco: 6.00},
            {nome: "Achocolatado", preco: 2.50},
            {nome: "Café", preco: 4.50},
        ]
        res.render('index',{
            nome: nome,
            lang: lang,
            pais: 'Brasil',
            estado: 'PR',
            empresa: '',
            ano: 2020,
            msg: exibirMsg,
            produtos: produtos
        })
    })

//CONFIG
    //SERVER
        app.listen(4587,(err)=>{
            if(err){
                Console.log('Erro'+err)
            }else{
                console.log('Rodando na porta 4587')
            }
        })
