import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideBtn from "./components/SideBtn"
import Main from "./pages/Main";
import Create from "./pages/Create";
import CreateWeb from "./pages/CreateWeb";
import GeneratorStore from "./pages/GeneratorStore";
import Generate from "./pages/Generate";
import GenerateWeb from "./pages/GenerateWeb";
import Generator from "./pages/Generator";
//import Test from "./pages/Test";
//<Route path="/test" element={<Test />} />
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <SideBtn />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/createWeb" element={<CreateWeb />} />
          <Route path="/store" element={<GeneratorStore />} />
          <Route path="/generate/:generatorId" element={<Generate />} />
          <Route path="/generateWeb" element={<GenerateWeb />} />
          <Route path="/generator" element={<Generator />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
