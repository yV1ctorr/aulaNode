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

app.put('/update-book/:id', (req, res) =>{
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;
    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send('livro não encontrado');
    }
});

app.listen(port, () =>{
    console.log('servidor rodando em http://localhost:${port}');
});

