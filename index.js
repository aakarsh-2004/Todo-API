const app = require("./src/app");
const config = require("./src/db/config");
const connectDB = require("./src/db/db");


const startServer = () => {
    const port = config.port || 3456;

    app.listen(config.port, () => {
        console.log(`${new Date()} : Server listening on PORT ${port}`);
    });

    connectDB();
}

startServer();