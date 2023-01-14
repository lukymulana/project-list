import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from 'moment';
import { Container, Row, Col, Button, Form } from 'react-bootstrap/';

const EditProject = () => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pic, setPic] = useState("");
  const [start, setStart] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [complexity, setComplexity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProjectById();
  }, []);

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/project-list/`, {
        id_project: id,
        nama_project: nama,
        deskripsi: deskripsi,
        pic: pic,
        start_date: start,
        due_date: due,
        priority: priority,
        status: status,
        task_complexity: complexity
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectById = async () => {
    const response = await axios.get(`http://localhost:8081/api/project-list?id_project=${id}`);
    const res = response.data
    res.data.map((project, index) => (
      setNama(project.nama_project),
      setDeskripsi(project.deskripsi),
      setPic(project.pic),
      setStart(Moment(project.start_date).format('YYYY-MM-DD')),
      setDue(Moment(project.due_date).format('YYYY-MM-DD')),
      setPriority(project.priority),
      setStatus(project.status),
      setComplexity(project.task_complexity)
    ))
  };

  return (
    <Form onSubmit={updateProject}>
      <Container>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nama Project</Form.Label>
              <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deksripsi</Form.Label>
              <Form.Control as="textarea" rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PIC</Form.Label>
              <Form.Control type="text" value={pic} onChange={(e) => setPic(e.target.value)} placeholder="PIC" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)} required >
                <option value="">-- Pilih --</option>
                <option value="0">LOW</option>
                <option value="1">NORMAL</option>
                <option value="2">HIGH</option>
                <option value="3">URGENT</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status}onChange={(e) => setStatus(e.target.value)} required >
                <option value="">-- Pilih --</option>
                <option value="0">TO DO</option>
                <option value="1">IN PROGRESS</option>
                <option value="2">IN REVIEW</option>
                <option value="3">COMPLETED</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Complexity</Form.Label>
              <Form.Select value={complexity} onChange={(e) => setComplexity(e.target.value)} required >
                <option value="">-- Pilih --</option>
                <option value="0">LOW</option>
                <option value="1">MEDIUM</option>
                <option value="2">HARD</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Button variant="secondary" type="button" href="/">Cancel</Button>
            &nbsp;
            <Button variant="primary" type="submit">Save</Button>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
      </Container>
    </Form>
  );
};

export default EditProject;
