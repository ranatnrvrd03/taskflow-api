const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById , updateTask, deleteTask} = require('../controllers/tasksController')

// Yeni görev oluşturma
router.post('/', createTask);
// Tüm görevleri listeleme
router.get('/', getAllTasks);
// Tek bir görevin detayını getirme
router.get('/:id', getTaskById);
// Bir görevi güncelleme
router.patch('/:id', updateTask);
//Bir görevi silme
router.delete('/:id', deleteTask);  
module.exports = router;