import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ProjectList/>}/>
        <Route path="add" element={<AddProject/>}/>
        <Route path="edit/:id" element={<EditProject/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
