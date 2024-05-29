const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, getUserTasks, getTask } = require('../controllers/taskController');
const authenticate = require('../middlewares/userAuth');

const taskRouter = express.Router();

taskRouter.post('/add', authenticate, createTask);
taskRouter.get('/gettasks', authenticate, getTasks);
taskRouter.get('/getusertasks', authenticate, getUserTasks)
taskRouter.get('/gettask/:taskId', authenticate, getTask);
taskRouter.put('/edit/:taskId', authenticate, updateTask);
taskRouter.delete('/deletetask/:taskId', authenticate, deleteTask);


module.exports = taskRouter;