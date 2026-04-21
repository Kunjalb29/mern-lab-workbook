const express = require('express');
const app = express();

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from MERN backend!' });
});

app.listen(5000, () => console.log('Server running on 5000'));