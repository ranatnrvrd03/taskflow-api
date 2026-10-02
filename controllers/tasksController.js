const { readTasks, writeTasks } = require('../data/taskStore');
const { ulid } = require('ulid');

// POST /tasks — yeni bir görev oluşturur
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

// GET /tasks — tüm görevleri listeler
function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json(tasks);
}

// GET /tasks/:id — id'si eşleşen tek bir görevi getirir
function getTaskById(req, res) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  res.status(200).json(task);
}

module.exports = { createTask, getAllTasks, getTaskById };