const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'tasks.json');

function readTasks() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Görevler okunurken hata oluştu:', err);
    return [];
  }
}

function writeTasks(tasks) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (err) {
    console.error('Görevler yazılırken hata oluştu:', err);
  }
}

module.exports = {readTasks, writeTasks};
