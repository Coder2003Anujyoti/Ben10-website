import React,{useEffect} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Site from "./main/Site.jsx";
import Auction from "./play/Auction.jsx";
import Teams from "./play/Teams.jsx";
import Stats from "./play/Stats.jsx";
import Fixtures from "./play/Fixtures.jsx";
import Game from "./play/Game.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
<Route path="/" element={<Site />} />
<Route path="/navbar" element={<Navbar  />} />
<Route path="/auction" element={<Auction  />} /> 
<Route path="/teams" element={<Teams  />} /> 
<Route path="/stats" element={<Stats  />} />
<Route path="/fixtures" element={<Fixtures  />} />
<Route path="/game" element={<Game   />} />
      </Routes>
    </Router>
  );
};

export default App;

