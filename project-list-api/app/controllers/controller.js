const Project = require("../models/model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data tidak boleh kosong"
        });
    }

    const project = new Project({
        id_project: req.body.emp_no,
        nama_project: req.body.nama_project,
        deskripsi: req.body.deskripsi,
        pic: req.body.pic,
        start_date: req.body.start_date,
        due_date: req.body.due_date,
        priority: req.body.priority,
        status: req.body.status,
        task_complexity: req.body.task_complexity
    });

    // CREATE
    Project.create(project, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.json({
            "status" : true,
            "data" : data
        });
    });
};

// READ ALL
exports.getData = (req, res) => {
    const id_project =  req.query.id_project;
    Project.getData(id_project, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status : false,
                    message: `Data Tidak Ditemukan`
                });
            } else {
                res.status(500).send({
                    status : false,
                    message: `Error ${id_project}.`
                });
            }
        } else res.json({
            "status" : true,
            "data" : data
        });    
    });
};

// UPDATE
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data tidak boleh kosong"
        });
    }

    Project.updateById(
        req.body.id_project,
        new Project(req.body),
        (err, data) => {
            if (err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Data Tidak Ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: `Error update ${req.body.id_project}`
                    });
                }
            } else res.send(data);
        }
    );
};

// DELETE
exports.delete = (req, res) => {
    if (!req.body.id_project) {
        res.status(400).send({
            message: "ID Kosong"
        });
    } else {
        Project.remove(req.body.id_project, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Data Tidak Ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: `Error delete ${req.body.id_project}`
                    });
                }
            } else res.send({ message: `Delete Sukses` });
        });
    }
    
};
