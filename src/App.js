import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Petition from "./routes/Petition";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Map />} />
        <Route path="petition" element={<Petition />} />
      </Routes>
      <div style={{ height: "100px" }}></div>
    </BrowserRouter>
  );
}

export default App;
