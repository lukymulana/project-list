const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp); 

describe('TEST APIs', () => {

    describe("Test GET ALL", () => {
        it("It should return all project list", (done) => {
            chai.request(server)
                .get("/api/project-list")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
 
        it("It should NOT return all the project", (done) => {
            chai.request(server)
                .get("/api/project_list")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET  by ID
     */
    describe("GET BY ID", () => {
        it("It should GET a Project by id", (done) => {
            const id = 1;
            chai.request(server)                
                .get("/api/project-list?id_project=" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data[0].should.have.property('id_project');
                    response.body.data[0].should.have.property('nama_project');
                    response.body.data[0].should.have.property('id_project').eq(1);
                done();
                });
        });

        it("It should NOT GET a Project by ID", (done) => {
            const id = 123;
            chai.request(server)                
                .get("/api/project-list?id_project=" + id)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
    

    // /**
    //  * Test POST
    //  */
    describe("POST", () => {
        it("It should POST a new project", (done) => {
            const project = {
                nama_project: "Test",
                deskripsi: "lorem ipsum laforte",
                pic: "Coba",
                start_date: "2023-01-01",
                due_date: "2023-01-11",
                priority: 1,
                status: 0,
                task_complexity: 0,
            };
            chai.request(server)                
                .post("/api/project-list")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq(true);
                done();
                });
        });

        it("It should NOT POST a new project without empty data", (done) => {
            const project = {};
            chai.request(server)                
                .post("/api/project-list")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(500);
                done();
                });
        });

    });


    // /**
    //  * Test the PUT route
    //  */
    describe("PUT", () => {
        it("It should PUT an existing Project List", (done) => {
            const project = {
                id_project: 1,
                nama_project: "Testing",
                deskripsi: "lorem ipsum laforte",
                pic: "Coba",
                start_date: "2023-01-01",
                due_date: "2023-01-11",
                priority: 1,
                status: 0,
                task_complexity: 0,
            };
            chai.request(server)                
                .put("/api/project-list/")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id_project').eq(1);
                    response.body.should.have.property('nama_project').eq("Testing");
                done();
                });
        });

        it("It should NOT PUT an existing project without ID", (done) => {
            const project = {
                nama_project: "Testing",
                deskripsi: "lorem ipsum laforte",
                pic: "Coba",
                start_date: "2023-01-01",
                due_date: "2023-01-11",
                priority: 1,
                status: 0,
                task_complexity: 0,
            };
            chai.request(server)                
                .put("/api/project-list/")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });        
    });    

    // /**
    //  * Test the DELETE
    //  */
    describe("DELETE", () => {
        it("It should DELETE an project list by ID", (done) => {
            const project = {
                id_project: 10
            };
            chai.request(server)                
                .delete("/api/project-list/")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a project where ID not in database", (done) => {
            const project = {
                id_project: 99
            };
            chai.request(server)                
                .delete("/api/project-list/")
                .send(project)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
});