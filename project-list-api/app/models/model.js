const sql = require("./db.js");

const Project = function(project) {
    this.id_project = project.id_project;
    this.nama_project = project.nama_project;
    this.deskripsi = project.deskripsi;
    this.pic = project.pic;
    this.start_date = project.start_date;
    this.due_date = project.due_date;
    this.priority = project.priority;
    this.status = project.status;
    this.task_complexity = project.task_complexity;
};

Project.create = (newProject, result) => {
    sql.query("INSERT INTO data_project SET ?", newProject, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(err, null);
            return;
        }
        // console.log("created project: ", { ...newProject });
        result(null, { ...newProject });
    });
};

Project.getData = (id_project, result) => {
    let query = "SELECT * FROM data_project";
    if (id_project) {
        query += ` WHERE id_project = ${id_project}`;
    }

    query += " ORDER BY priority desc, due_date ASC, task_complexity ASC;"
    sql.query(query, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length == 0) {
            // console.log("ID Not Found");
            result({ kind: "not_found" }, null);
            return;
        }
        // console.log("projects: ", res);
        result(null, res);
    });
};

Project.updateById = (id_project, project, result) => {
    sql.query(
        "UPDATE data_project SET nama_project = ?, deskripsi = ?, pic = ?, start_date = ?, due_date = ?, priority = ?, status = ?, task_complexity = ? WHERE id_project = ?",
        [project.nama_project, project.deskripsi, project.pic, project.start_date, project.due_date, project.priority, project.status, project.task_complexity, id_project],
        (err, res) => {
            if (err) {
                // console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                //not found project
                result({ kind: "not_found" }, null);
                return;
            }
            // console.log("updated karyawan: ", { ...karyawan });
            result(null, { ...project });
        }
    );
};

Project.remove = (id_project, result) => {
    sql.query("DELETE FROM data_project WHERE id_project = ?", id_project, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            //not found Karyawan with the id
            result({ kind: "not_found" }, null);
            return;
        }
        // console.log("deleted karyawan with id_project: ", id_project);
        result(null, res);
    });
};

module.exports = Project;