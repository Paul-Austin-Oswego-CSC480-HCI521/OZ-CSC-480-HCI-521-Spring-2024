
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { About, Home, Contact, HowItWorks, PetDetails } from "./components/pages/pages";





function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/hiw" element={<HowItWorks />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="PetDetails" element={<PetDetails />}/>
      </Routes>
      <div className="App">
     
    </div>
    </div>
    
  );
}

export default App;
