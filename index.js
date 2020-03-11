const express = require('express')
//const mysql = require('mysql')
const app = express()

//VIEW ENGINE
    app.set('view engine','ejs') //view engine
    app.use(express.static('public')) //define o local dos arquivos estaticos

//ROUTES
    app.get('/',(req,res)=>{
        res.render('index')
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
