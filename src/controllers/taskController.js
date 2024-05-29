const Task = require("../models/taskModel");
const User = require("../models/userModel");

const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const createdTask = await Task.create({
            title,
            description
        });
        console.log(createdTask);
        const updatedUser = await User.updateOne({
            _id: req.headers.userId
        }, {
            "$push": {
                tasks: createdTask._id
            }
        })
        if(createdTask && updatedUser) {
            return res.status(201).json(createdTask);
        }
    } catch (error) {
        return res.status(500).json({msg: 'cannot create task'+error});
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if(tasks) {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        return res.status(500).json({msg: 'cannot find tasks'});
    }
}



const getTask = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const response = await Task.findById(taskId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: 'error while finding that task'});
    }
}




const getUserTasks = async (req, res) => {
    const id = req.headers.userId;

    try {
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const taskPromises = user.tasks.map(taskId => Task.findById(taskId).exec());
        const userTasks = await Promise.all(taskPromises);

        return res.status(200).json(userTasks);
    } catch (error) {
        return res.status(500).json({ msg: `Error while finding user: ${error}` });
    }
};



const updateTask = async (req, res) => {
    const id = req.params.taskId;
    const { title, description } = req.body;
    console.log(req.body);
    try {
        const response = await Task.findByIdAndUpdate(id, { title: title, description: description });
        if(response) {
            return res.status(200).json({msg: 'successfully edited!'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'cannot update the task'});
    }
}

const deleteTask = async (req, res) => {
    const id = req.params.taskId;
    try {
        const response = await Task.findByIdAndDelete(id);
        if(response) {
            await User.updateOne({
                _id: req.headers.userId
            }, {
                $pull: {
                    tasks: id
                }
            })
            return res.status(200).json({msg: 'deleted the task successfully'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'error while deleting the task'});
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask, getUserTasks, getTask };