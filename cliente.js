const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'backend'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});


// rota para lidar com o método POST para inserir um usuario
app.post('/api/usuario', (req, res) => {
    const { email, senha } = req.body;

    // inserir os dados na tabela 'usuario' no banco de dados usando uma query
    const sql = 'INSERT INTO usuario (email, senha) VALUES(?, ?)'
    connection.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('erro ao inserir registro:' + err.mensage);
        } else {    
            console.log('registro inserido com sucesso!');
            res.status(201).json({ mensage: 'registro inserido com sucesso' });
        }
    });
});


//rota para lidar com o metodo PUT para atualizar um usuario
app.put('/api/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;
    //atualizar os dados na tabela 'usuario' no banco de dados usando uma ...
    const sql = 'update usuario SET email = ?, senha = ? where id = ?';
    connection.query(sql, [email, senha, id], (err, results) => {
        if (err) {
            console.error('erro ao atualizar registro:' + err.message);
            res.status(500).json({ error: 'erro ao atualizar registro' });
        } else {
            console.log('registro atualizado com sucesso!');
            res.status(200).json({ message: 'registro atualizado com sucesso' });
        }
    });
});


app.delete('/api/usuario/:id', (req, res) => {
    const { id } = req.params;
    //excluir o registro na tabela 'usuario' no banco de dados pelo ID
    const sql = 'delete from usuario where id = ?';
    connection.query(sql, [id], (err, result) =>{
        if(err) {
            console.error('erro ao excluir registro:' + err.message);
            res.status(500).json({error: 'erro ao excluir regsitro'});
        } else {
            if ( result.affectedRows > 0) {
                console.log('registro excluido com sucesso!');
                res.status(200).json({message: 'registro excluido com sucesso'});
            } else {
                console.log('registro não encontrado.');
                res.status(404).json({mensage: 'registro não encontrado'});
            }
        }
    });
});


//rota para lidar com o metodo GET 
app.get('/api/usuario', (req, res) => {
    const sql = 'SELECT * FROM usuario'
    connection.query(sql,(err, results) =>{
        if (err) {
            console.error('erro ao buscar registros:' + err.message);
            res.status(500).json({error: 'erro ao buscar registros'}); 
        } else {
            res.status(200).json(results);
        }
    });
});