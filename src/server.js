const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

let cardapio = [];

app.post('/cardapio', (req, res) => {
  const novoItem = req.body;
  cardapio.push(novoItem);
  res.status(201).json(novoItem);
});

app.get('/cardapio', (req, res) => {
    res.json(cardapio);
  });

  app.get('/cardapio/:id', (req, res) => {
    const itemId = req.params.id;
    const item = cardapio.find((item) => item.id === itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  });

  app.put('/cardapio/:id', (req, res) => {
    const itemId = req.params.id;
    const itemIndex = cardapio.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      cardapio[itemIndex] = req.body;
      res.json(cardapio[itemIndex]);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  });

  app.delete('/cardapio/:id', (req, res) => {
    const itemId = req.params.id;
    const itemIndex = cardapio.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const deletedItem = cardapio.splice(itemIndex, 1);
      res.json(deletedItem[0]);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });