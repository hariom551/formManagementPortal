import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SideNavBar({ show }) {
    const [dropdownStates, setDropdownStates] = useState({
        users: false,
        outgoing: false,
        incoming: false,
        pariseeman: false,
        SubAdmin: false,
        Caste: false,
        Reporters: false,
        PollingStation: false,
        voterList: false,
        Form: false,
        VoterL: false,
        Staff: false,
        forms: false,

    });

    const toggleDropdown = (dropdown) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/';
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user ? user.role : "";

    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <div className="navbar">
                <ul>
                    <li><h5><b> MAIN NAVIGATION</b></h5></li>
                </ul>

                {role === 'Super Admin' && (
                    <div className="superadmin-link">
                        <ul>
                            <li><Link to="/Home">Home</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/district">District</Link></li>
                        </ul>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('users')}>
                                Users <span className="dropdown-symbol">{dropdownStates.users ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.users ? 'show' : ''}`} id="users-dropdown-content">
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Forms Admin" }}>Forms Admin</Link></li></ul>
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Admin" }}>Admin</Link></li></ul>
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Vidhansabha Admin" }}>Vidhansabha Admin</Link></li></ul>
                            </div>
                        </div>


                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('outgoing')}>
                                Out./Inc.List <span className="dropdown-symbol">{dropdownStates.outgoing ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.outgoing ? 'show' : ''}`} id="outgoing-dropdown-content">
                                <ul><li><Link to="/OutgoingList">Outgoing List</Link></li></ul>
                                <ul><li><Link to="/IncomingList">Incoming List</Link></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('incoming')}>
                                Out./Inc.History <span className="dropdown-symbol">{dropdownStates.incoming ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.incoming ? 'show' : ''}`} id="incoming-dropdown-content">
                                <ul><li><Link to="/OutgoingList">Outgoing List</Link></li></ul>
                                <ul><li><Link to="/IncomingList">Incoming List</Link></li></ul>
                            </div>
                        </div>

                        {/* Other menu items and dropdowns */}

                        <ul><li> <Link onClick={handleLogout}>Logout</Link></li></ul>
                    </div>
                )}

                {role === 'Forms Admin' && (
                    <div className="formadmin-link">
                        <ul><li><Link to="/Home">Home</Link></li></ul>


                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Forms')}>
                                Forms <span className="dropdown-symbol">{dropdownStates.Forms ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.VoterL ? 'show' : ''}`} id="caste-dropdown-content">
                                <ul><li><a href="/outgoingForms">Outgoing Forms</a></li></ul>
                                <ul><li><a href="/incomingForms">Incoming Forms</a></li></ul>
                                <ul><li><a href="/updatedIncomingForms">Updated Incoming Forms</a></li></ul>
                            </div>
                        </div>

                        <ul><li><Link onClick={handleLogout}>Logout</Link></li></ul>
                    </div>
                )}

                {role === 'Admin' && (
                    <div className="admin-link">
                        <ul><li><Link to="/Home">Home</Link></li></ul>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('SubAdmin')}>
                                Sub Admin<span className="dropdown-symbol">{dropdownStates.SubAdmin ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.SubAdmin ? 'show' : ''}`} id="SubAdmin-dropdown-content">
                                {/* <ul><li><Link to="/userForm">Sub Admin</Link></li></ul> */}
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Sub Admin" }}>Sub Admin</Link></li></ul>
                            </div>
                        </div>


                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('pariseeman')}>
                                Pariseeman<span className="dropdown-symbol">{dropdownStates.pariseeman ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.pariseeman ? 'show' : ''}`} id="pariseeman-dropdown-content">
                                <ul><li><Link to="/Tehsil">Tehsil</Link></li></ul>
                                <ul><li><Link to="/Council">Council</Link></li></ul>
                                <ul><li><Link to="/VidhanSabha">VidhanSabha</Link></li></ul>
                                <ul><li><Link to="/WardBlock">Ward/Block</Link></li></ul>
                                <ul><li><Link to="/chakblock">chak/block</Link></li></ul>
                                <ul><li><Link to="/Areavill">Area/ vill</Link></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Caste')}>
                                Caste <span className="dropdown-symbol">{dropdownStates.Caste ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.Caste ? 'show' : ''}`} id="caste-dropdown-content">
                                <ul><li><a href="/CasteManagement" >Caste Management</a></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('PollingStation')}> Polling Station <span className="dropdown-symbol">{dropdownStates.PollingStation ? '-' : '+'}</span></button>
                            <div className={`dropdown-content ${dropdownStates.PollingStation ? 'show' : ''}`} id="pollingstation-dropdown-content">
                                <ul><li><Link to="/PollingStationList">Polling Station List</Link></li></ul>
                                <ul><li><Link to="/PollingStationAllotment">Polling Station Allotment</Link></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Reporters')}>Reporters <span className="dropdown-symbol">{dropdownStates.Reporters ? '-' : '+'}</span></button>
                            <div className={`dropdown-content ${dropdownStates.Reporters ? 'show' : ''}`} id="reporters-dropdown-content">
                                <ul><li><Link to="/MISDISTRICT">MIS DISTRICT</Link></li></ul>
                                <ul><li><Link to="/MISWardWise">MIS Ward wise</Link></li></ul>
                                <ul><li><Link to="/MISVidhansabhawise">MIS Vidhansabha wise</Link></li></ul>
                                <ul><li><Link to="/MISPollingStationwise">MIS Polling Station wise</Link></li></ul>
                                <ul><li><Link to="/PollingStationVoterwise">Polling Station Voter wise</Link></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('voterList')}> Voter Reports <span className="dropdown-symbol">{dropdownStates.voterList ? '-' : '+'}</span></button>
                            <div className={`dropdown-content ${dropdownStates.voterList ? 'show' : ''}`} id="voterlist-dropdown-content">
                                <ul><li><Link to="/VoterList">Voter List</Link></li></ul>
                                <ul><li><Link to="/MotherRoleVoterList">Mother Role Voter List</Link></li></ul>
                                <ul><li><Link to="/DeleteVoter">Delete Voter</Link></li></ul>
                            </div>
                        </div>


                        <ul><li><Link onClick={handleLogout}>Logout</Link></li></ul>
                        {/* <Link to="/logout" className="logout-button">Logout</Link> */}
                    </div>
                )}

                {role === 'Sub Admin' && (
                    <div className="subadmin-link">
                        <ul><li><Link to="/Home">Home</Link></li></ul>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Staff')}>
                                Staff<span className="dropdown-symbol">{dropdownStates.Staff ? '-' : '+'}</span>
                            </button>

                            <div className={`dropdown-content ${dropdownStates.Staff ? 'show' : ''}`} id="Staff-dropdown-content">
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Feeding Staff" }}>Feeding Staff</Link></li></ul>
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=Quality Staff" }}>Quality Staff</Link></li></ul>
                                <ul><li><Link to={{ pathname: "/userForm", search: "?content=App Feeding Staff" }}>App Feeding Staff</Link></li></ul>
                            </div>
                        </div>
                        <br />
                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Form')}>
                                Form<span className="dropdown-symbol">{dropdownStates.Form ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.Form ? 'show' : ''}`} id="form-dropdown-content">
                                <ul><li><Link to="/staffEntry">Staff Entry</Link></li></ul>
                                <ul><li><Link to="/staffSearchCount">Staff Search Count</Link></li></ul>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('VoterL')}>
                                Voter List <span className="dropdown-symbol">{dropdownStates.VoterL ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.VoterL ? 'show' : ''}`} id="caste-dropdown-content">
                                <ul><li><a href="/VoterList">Voter List</a></li></ul>
                                <ul><li><a href="/ReferenceVoterList">Reference Voter List</a></li></ul>
                                <ul><li><a href="/ApprovedVoterList">Approved Voter List</a></li></ul>
                            </div>
                        </div>

                        <ul><li><Link onClick={handleLogout}>Logout</Link></li></ul>
                    </div>
                )}


                {role === 'Feeding Staff' && (
                    <div className="feedingStaff-link">
                        <ul><li><Link to="/Home">Home</Link></li></ul>

                        <div className="dropdown">
                            <button className="dropbtn" onClick={() => toggleDropdown('Form')}>
                                Form<span className="dropdown-symbol">{dropdownStates.Form ? '-' : '+'}</span>
                            </button>
                            <div className={`dropdown-content ${dropdownStates.Form ? 'show' : ''}`} id="form-dropdown-content">
                                <ul><li><Link to="/AddVoterForm">Add Voter's Form</Link></li></ul>
                                <ul><li><Link to="/SearchChakBlock">Search Chak Block</Link></li></ul>
                            </div>
                        </div>
                     

                        <ul><li><Link onClick={handleLogout}>Logout</Link></li></ul>
                    </div>
                )}



            </div>




            {/* Other general navigation items */}
            {/* <ul>
                <li><a href="/" className='active'>Home</a></li>
                <li><a href="/">About Us</a></li>
                <li><a href="/">Contact us</a></li>
            </ul> */}
        </div>
    );
}

export default SideNavBar;
