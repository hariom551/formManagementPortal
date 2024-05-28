import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout.jsx';
import Login from './components/Pages/Login.jsx';
import Home from './components/Pages/Home.jsx';
import UserForm from './components/SuperAdmin/UserForm.jsx';
import ChangePassword from './components/SuperAdmin/ChangePassword.jsx';             
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Caste from './components/Admin/Caste.jsx';
import District from './components/SuperAdmin/District.jsx';
import EditDistrictDetails from './components/SuperAdmin/EditDistrictDetails.jsx';
import Tehsil from './components/Admin/Tehsil.jsx';
import Council from './components/Admin/Council.jsx';
import VidhanSabha from './components/Admin/VidhanSabha.jsx';
import WardBlock from './components/Admin/WardBlock.jsx';
import ChakBlock from './components/Admin/ChakBlock.jsx';
import AreaVill from './components/Admin/AreaVill.jsx';
import PollongStationList from './components/Admin/pollingStationList.jsx';

import PollingStationAllotment from './components/Admin/pollingStationAllotment.jsx';
import OutgoingForms from './components/FormsAdmin/OutcomingForm.jsx';
import AddVoterForm from './components/FeedingStaff/AddVoterForm.jsx';
import IncomingForms from './components/FormsAdmin/IncomingForms.jsx';
import UpdateIncomingForm from './components/FormsAdmin/UpdateIncomingForm.jsx';
import AddVoter from './components/FeedingStaff/AddVoter.jsx';








const getRoutesForRole = (role) => {
  switch (role) {

    case 'Super Admin':
      return (
        <>
          <Route path="/Home" element={<Home />} />
          <Route path="/district" element={<District />} />
          <Route path="/editDistrictDetails" element={<EditDistrictDetails />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </>
      );

      case 'Forms Admin':
        return (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/incomingForms" element={<IncomingForms />} />
            <Route path="/outgoingForms" element={<OutgoingForms />} />
            <Route path="/updatedIncomingForms" element={<UpdateIncomingForm />} />
          
          </>
        );
    

    case 'Admin':
      return (
        <>
          <Route path="/Home" element={<Home />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/tehsil" element={<Tehsil />} />
          <Route path="/council" element={<Council />} />
          <Route path="/casteManagement" element={<Caste />} />
          <Route path="/vidhanSabha" element={<VidhanSabha />} />
          <Route path="/WardBlock" element={<WardBlock/>}/>
          <Route path="/chakBlock" element={<ChakBlock/>}/>
          <Route path="/areaVill" element={<AreaVill/>}/>
          <Route path="/pollingStationList" element={<PollongStationList/>}/>
          <Route path="/pollingStationAllotment" element={<PollingStationAllotment/>}/>
        </>
      );

      case 'Sub Admin':
        return (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </>
        );

        case 'Feeding Staff':
          return (
            <>
              <Route path="/Home" element={<Home />} />
              {/* <Route path="/AddVoterForm" element={<AddVoterForm />} /> */}
              <Route path="/AddVoterForm" element={<AddVoter />} />
             
            
            </>
          );
      
      
      
  
      // default:
    //   // Default to login page if role is not recognized
    //   return <Navigate to="/" />;
  }
};

const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user ? user.role : "";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          {getRoutesForRole(userRole)}
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
