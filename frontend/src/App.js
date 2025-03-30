import React,{useEffect} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Site from "./main/Site.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
<Route path="/" element={<Site />} />
<Route path="/navbar" element={<Navbar  />} />
      </Routes>
    </Router>
  );
};

export default App;

