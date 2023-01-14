import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from 'moment';
import { Table, Container, Row, Col, Button, Badge } from 'react-bootstrap/';


const ProjectList = () => {
  Moment.locale('en');
  const [projects, setProject] = useState([]);

  useEffect(() => {
    getProjects();
    
  }, []);

  const getProjects = async () => {
    const response = await axios.get("http://localhost:8081/api/project-list");
    setProject(response.data.data);
  };

  const deleteProject = async (id) => {
    try {
      
      await axios.delete('http://localhost:8081/api/project-list/', {
        data: {
          id_project: id
        }
    });
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Container>
        <Row>
          <Col>
            &nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Deskripsi</th>
                  <th>PIC</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Task Complexity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{project.nama_project}</td>
                    <td>{project.deskripsi}</td>
                    <td>{project.pic}</td>
                    <td>{Moment(project.start_date).format('DD MMM YYYY')}</td>
                    <td>{Moment(project.due_date).format('DD MMM YYYY')}</td>
                    {
                      project.priority == 0 ? <td><Badge bg="secondary">LOW</Badge></td>
                      :
                      project.priority == 1 ? <td><Badge bg="primary">NORMAL</Badge></td>
                      :
                      project.priority == 2 ? <td><Badge bg="warning">HIGH</Badge></td>
                      :
                      <td><Badge bg="danger">URGENT</Badge></td>
                    }
                    
                    {
                      project.status == 0 ? <td><Badge bg="secondary">TO DO</Badge></td>
                      :
                      project.status == 1 ? <td><Badge bg="primary">IN PROGRESS</Badge></td>
                      :
                      project.status == 2 ? <td><Badge bg="warning">IN REVIEW</Badge></td>
                      :
                      <td><Badge bg="success">COMPLETED</Badge></td>
                    }

                    {
                      project.task_complexity == 0 ? <td><Badge bg="success">LOW</Badge></td>
                      :
                      project.task_complexity == 1 ? <td><Badge bg="warning">MEDIUM</Badge></td>
                      :
                      <td><Badge bg="danger">HARD</Badge></td>
                    }
                    <td>
                      <Button href={`edit/${project.id_project}`} variant="primary">Edit</Button>
                      &nbsp;&nbsp;
                      <Button onClick={() => deleteProject(project.id_project)} variant="danger">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button href={`add`} variant="success">Add Project</Button>
          </Col>
        </Row>
      </Container>
        
  );
};

export default ProjectList;
