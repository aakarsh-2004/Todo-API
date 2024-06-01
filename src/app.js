const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'https://todo-client-jet.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);


module.exports = app;