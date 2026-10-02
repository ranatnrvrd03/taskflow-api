const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const logger = require('./middleware/logger');
const port = 7777;

// Logger middleware'i uygulamaya ekle
app.use(logger);

// Gelen isteklerdeki JSON gövdesini okunabilir hale getiren middleware
app.use(express.json());

// /tasks ile başlayan tüm istekleri tasksRouter'a yönlendir
app.use('/tasks', tasksRouter);

// Sunucunun ayakta olduğunu test etmek için basit bir ana sayfa route'u
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Sunucuyu belirlenen port üzerinden dinlemeye başlat
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});