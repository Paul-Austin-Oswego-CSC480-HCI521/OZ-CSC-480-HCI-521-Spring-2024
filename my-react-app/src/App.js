import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import RehomePage from "./Components1/RehomePage";
import MultiFilters from "./MultiFilters";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rehome-page" element={<RehomePage />} />
          <Route path="/multi-filters" element={<MultiFilters />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;