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
// PATCH /tasks/:id — id'si eşleşen görevi günceller
function updateTask(req, res) {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  const { title, status, description, priority, assignee } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    status: status || tasks[taskIndex].status,  
    description: description || tasks[taskIndex].description,
    priority: priority || tasks[taskIndex].priority,
    assignee: assignee || tasks[taskIndex].assignee,
    updatedAt: new Date().toISOString(),
  };

  writeTasks(tasks);
  res.status(200).json(tasks[taskIndex]);
}

// DELETE /tasks/:id — id'si eşleşen görevi siler
function deleteTask(req, res) {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  res.status(204).send();
  
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };