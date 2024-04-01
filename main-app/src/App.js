import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/pages/Home';
import { About } from './Components/pages/About';
import { Contact } from './Components/pages/Contact';
import { PetDetails } from './Components/pages/PetDetails';
import MultiFilters from './Components/pages/MultiFilters';





function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/hiw" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/ExplorePets" element={<MultiFilters />}/>
        <Route path="PetDetails" element={<PetDetails />}/>
      </Routes>
      <div className="App">
     
    </div>
    </div>
    
  );
}

export default App;