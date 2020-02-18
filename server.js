const express = require('express')
const nunjucks=require('nunjucks')
const Pool = require('pg').Pool

const dbConfig=require('./config/database')

const server=express()

// CONFIGURAR O SERVIDOR PARA APRESENTAR ARQUIVOS ESTÁTICOS
server.use(express.static('public'))

// HABILITAR BODY DO FORM
server.use(express.urlencoded({ extended:true }))

// CONEXÃO COM BANCO DE DADOS
const db = new Pool(dbConfig)

// CONFIGURANDO A TEMPLATE ENGINE
nunjucks.configure("./",{
    express : server,
    noCache : true
})

const donors=[
    {
        name:"William José Dias",
        blood:"AB+"
    },
    {
        name:"Karolaine Ribeiro Dias",
        blood:"A+"
    },
    {
        name:"Luciana Pezarini",
        blood:"O+"
    },
    {
        name:"Gustavo Pezarini",
        blood:"A-"
    },
]

const port=3333

server.get('/',function(req,res){
    return res.render("index.html", {donors})
})

server.post('/', function(req,res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name:name,
        blood:blood
    })

    return res.redirect("/")
})

server.listen(port,()=>{
    console.log(`Servidor online na porta ${port}`)
})