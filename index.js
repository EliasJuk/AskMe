const express = require('express')
//const mysql = require('mysql')
const app = express()

//VIEW ENGINE
    app.set('view engine','ejs')

//ROUTES
    app.get('/',(req,res)=>{
        res.render('index')
    })

    app.get('/home',(req,res)=>{
        res.render('home')
    })

    app.get('/perfil',(req,res)=>{
        res.render('principal/perfil')
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
