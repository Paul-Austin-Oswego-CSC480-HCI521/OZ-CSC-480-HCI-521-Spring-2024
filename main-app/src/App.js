import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import ShelterNavbar from "./Components/ShelterNavbar";
import ShelterNavbar2 from "./Components/ShelterNavbar2";
import { Home } from "./Components/pages/Home";
import { About } from "./Components/pages/About";
import { PetDetails } from "./Components/pages/PetDetails";
import MultiFilters from "./Components/pages/MultiFilters";
import { RehomePage } from "./Components/pages/Rehome";
import Footer from "./Components/Footer";
import Login from "./Components/pages/Login";
import ShelterDashboard from "./Components/pages/ShelterDashboard";
import Onboarding from "./Components/pages/Onboarding/Onboarding";
import { Helmet } from "react-helmet";
import Subfooter from "./Components/Subfooter";
import { CategoryProvider } from "./Components/CategoryContext";
import UserBoard from "./Components/pages/UserBoard";
import FAQs from "./Components/pages/FAQPage";
import RehomePageViewDashboard from "./Components/pages/Rehome_ViewDashboard";
import ShelterNavbar3 from "./Components/ShelterNavbar3";
import ShelterNavbar4 from "./Components/ShelterNavbar4";
// import RehomePage from './Components/pages/Rehome';

function App() {
  let location = useLocation();
  let navbarComponent;
  if (
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/ExplorePets" ||
    location.pathname === "/userboard" ||
    location.pathname === "/PetDetails" ||
    location.pathname === "/FAQs"
  ) {
    navbarComponent = <Navbar />;
  }
  // else if (
  //   location.pathname === "/shelter" ||
  //   location.pathname === "/login" ||
  //   location.pathname === "/signup"
  // ) {
  //   navbarComponent = <ShelterNavbar2 />;
  // }
  else if (location.pathname === "/viewdash") {
    navbarComponent = <ShelterNavbar3 />;
  } else if (location.pathname === "/shelter") {
    navbarComponent = <ShelterNavbar4 />;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <CategoryProvider>
        {navbarComponent}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" />
          <Route path="/ExplorePets" element={<MultiFilters />} />
          <Route path="/PetDetails/:id" element={<PetDetails />} />
          <Route path="/shelter" element={<RehomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Onboarding />} />
          <Route path="/dashboard" element={<ShelterDashboard />} />
          <Route path="/userboard/:id" element={<UserBoard />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/viewdash" element={<RehomePageViewDashboard />} />
        </Routes>
        <Footer />
      </CategoryProvider>
      {/* <Subfooter /> */}
    </div>
  );
}

export default App;
