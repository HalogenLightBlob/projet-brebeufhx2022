import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Petition from "./routes/Petition";
import NavBar from "./components/NavBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="petition" element={<Petition />} />
      </Routes>
      <div style={{ height: "100px" }}></div>
    </BrowserRouter>
  );
}

export default App;
