const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);


module.exports = app;