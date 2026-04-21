const express = require('express');
const app = express();
app.use(express.json());

let items = [];

app.post('/items', (req, res) => {
  items.push(req.body);
  res.status(201).send('Created');
});

app.get('/items', (req, res) => res.json(items));

app.listen(3000, () => console.log('Server running on port 3000'));