const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const port = 7777;

app.use(express.json());
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});