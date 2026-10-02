const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById } = require('../controllers/tasksController')

// Yeni görev oluşturma
router.post('/', createTask);
// Tüm görevleri listeleme
router.get('/', getAllTasks);
// Tek bir görevin detayını getirme
router.get('/:id', getTaskById);

module.exports = router;