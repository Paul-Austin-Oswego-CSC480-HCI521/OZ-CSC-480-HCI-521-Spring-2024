
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import { Home } from "./components/pages/Home"
import { HowItWorks } from './components/pages/HowItWorks';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/hiw" element={<HowItWorks />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
    </div>
  );
}

export default App;
