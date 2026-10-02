const { readTasks, writeTasks } = require('../data/taskStore');
const { ulid } = require('ulid');

function createTask(req, res) {
  const { title, description, priority, assignee } = req.body;
  const tasks = readTasks();
  const newTask = {
    id: ulid(),
    title,
    description,
    status: 'pending',
    priority,
    assignee,
    createdAt: new Date().toISOString(),
  };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
}

function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json(tasks);
}

module.exports = { createTask, getAllTasks };