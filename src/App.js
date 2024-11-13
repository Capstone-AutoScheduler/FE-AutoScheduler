import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import CalendarPage from "./pages/calendarPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
