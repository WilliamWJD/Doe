const express = require('express')
const nunjucks=require('nunjucks')

const server=express()

// CONFIGURAR O SERVIDOR PARA APRESENTAR ARQUIVOS ESTÁTICOS
server.use(express.static('public'))

// CONFIGURANDO A TEMPLATE ENGINE
nunjucks.configure("./",{
    express : server
})

const port=3333

server.get('/',function(req,res){
    return res.render("index.html")
})

server.listen(port,()=>{
    console.log(`Servidor online na porta ${port}`)
})