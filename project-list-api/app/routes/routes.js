module.exports = app => {
    const project = require("../controllers/controller.js");
    var router = require("express").Router();

    router.post("/", project.create);
    router.get("/", project.getData);
    router.put("/", project.update);
    router.delete("/", project.delete);
    
    app.use('/api/project-list', router);
};