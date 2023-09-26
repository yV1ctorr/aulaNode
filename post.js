const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extend: true}));
app.use(express.json());

let books = [
    {id: 1, title: 'anjos e demonios'},
    {id: 2, title: 'o principe'},
    {id: 3, title: 'saboroso cadaver'}
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/post-exemplo', (req, res) =>{
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.listen(port, () =>{
    console.log('servidor rodando em http://localhost:${port}');
});