import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Create from "./pages/Create";
import GeneratorStore from "./pages/GeneratorStore";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/store" element={<GeneratorStore />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
