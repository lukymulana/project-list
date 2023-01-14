const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Project List API"
    });
});

require("./app/routes/routes.js")(app);

const port = process.env.NODE_DOCKER_PORT || 8081;

module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));