const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

// configurar conexão com o mysql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: ''
});

connection.connect((err) => {
    if (err) {
        console.error('erro ao conectar ao MySQL:' + err.mensage);
    } else {
        console.log('conectado ao MySQL');
    }
});

// midlleware para lidar com dados codificados no corpo da solicitação 
app.use(express.urlencoded({extend: true}));
app.use(express.json());

// rota para lidar com o método POST para inserir um usuario
app.post('/api/usuarios', (req,res) => {
    const {Email, senha} = req.body;

    // inserir os dados na tabela 'usuario' no banco de dados usando uma query
    const sql = 'INSERT INTO usuario (email, senha) VALUES(?, ?)'
    connection.query(sql, [email, senha],(err, result) => {
        if (err) {
            console.error('erro ao inserir registro:' + err.mensage);
        } else {
            console.log('registro inserido com sucesso!');
            res.status(201).json({mensage: 'registro inserido com sucesso'});
        }
    });
});

// iniciar servidor
app.listen(port, () => {
    console.log('servidor iniciado na porta ${port}');
});

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: ''
});

db.connect(err =>{
    if(err) {
        console.error('erro ao conectar ao mysql:', err);
    } else {
        console.log('conectado ao mysql');
    }
});