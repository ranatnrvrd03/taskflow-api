const express = require('express');
const router = express.Router();
const { createTask, getAllTasks } = require('../controllers/tasksController');

router.post('/', createTask);
router.get('/', getAllTasks);

module.exports = router;