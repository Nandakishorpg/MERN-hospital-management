import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import PatientRegister from "./pages/patient/register/PatientRegister";
import Login from "./pages/login/Login";
import PatientHome from "./pages/patient/register/patientHome/PatientHome";
import Profile from "./pages/patient/profile/Profile";
import Dochome from "./pages/doctor/DocHome/Dochome";
import DocProfile from "./pages/doctor/profile/DocProfile";
import DocList from "./pages/patient/doclist/DocList"
import Appointment from './pages/doctor/appointments/Appointment'
import Bookingstatus from "./pages/patient/bookingstatus/Bookingstatus";
import Admhome from "./pages/admin/home/Admhome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/patienthome" element={<PatientHome/>}></Route>
          <Route path="/patientprofile" element={<Profile/>}></Route>
          
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/patientreg" element={<PatientRegister></PatientRegister>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dochome" element={<Dochome/>}></Route>
          <Route path="/docprofile" element={<DocProfile/>}></Route>
          <Route path="/doctorslist" element={<DocList/>}></Route>
          <Route path="/appointments" element={<Appointment/>}></Route>
          <Route path="/bookingstatus" element={<Bookingstatus/>}></Route>
          <Route path="/admhome" element={<Admhome/>}/>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
