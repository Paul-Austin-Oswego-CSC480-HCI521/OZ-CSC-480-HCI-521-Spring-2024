import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Home } from "./Components/pages/Home";
import { About } from "./Components/pages/About";
import { Contact } from "./Components/pages/Contact";
import { PetDetails } from "./Components/pages/PetDetails";
import MultiFilters from "./Components/pages/MultiFilters";
import RehomePage from "./Components/pages/Rehome";
import Footer from "./Components/Footer";
import Login from "./Components/pages/Login";
import Dashboard from "./Components/pages/Dashboard";
import Onboarding from "./Components/pages/Onboarding/Onboarding";
import {Helmet} from "react-helmet";
// import RehomePage from './Components/pages/Rehome';

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ExplorePets" element={<MultiFilters />} />
        <Route path="PetDetails" element={<PetDetails />} />
        <Route path="/shelter" element={<RehomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      <div className="App"></div>
    </div>
  );
}

export default App;
