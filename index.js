const express = require('express')
//const mysql = require('mysql')
const app = express()

//VIEW ENGINE
    app.set('view engine','ejs')

//ROUTES
    app.get('/',(req,res)=>{
        var nome = "Elias Juk"
        var lang = "JavaScript"
        res.render('index',{
            nome: nome,
            lang: lang,
            pais: 'Brasil'
        })
    })

//CONFIG
    //SERVER
        app.listen(4587,(err)=>{
            if(err){
                Console.log('Erro'+err)
            }else{
                console.log('OK')
            }
        })
