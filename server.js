const express = require('express')
const nunjucks = require('nunjucks')
const Pool = require('pg').Pool

const dbConfig = require('./config/database')

const server = express()

// CONFIGURAR O SERVIDOR PARA APRESENTAR ARQUIVOS ESTÁTICOS
server.use(express.static('public'))

// HABILITAR BODY DO FORM
server.use(express.urlencoded({ extended: true }))

// CONEXÃO COM BANCO DE DADOS
const db = new Pool(dbConfig)

// CONFIGURANDO A TEMPLATE ENGINE
nunjucks.configure("./", {
    express: server,
    noCache: true
})

const port = 3333

server.get('/', function (req, res) {
    db.query("SELECT * FROM donors", function (err, result) {
        if (err) {
            return res.send("Erro no banco de dados")
        }
        const donors=result.rows
        return res.render("index.html", { donors })
    })
})

server.post('/', function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`
    const values = [name, email, blood]

    db.query(query, values, function (err) {
        if (err) {
            return res.send("Erro no banco de dados.")
        }
        return res.redirect("/")
    })
})

server.listen(port, () => {
    console.log(`Servidor online na porta ${port}`)
})