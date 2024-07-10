import React, { useState, useEffect } from "react";
import UserEcologicalFootprintChart from "../UserEcologicalFootprintChart";
import ClassificationFrequencyChart from "../ClassificationFrequencyChart";
import PolarAreaChart from "../PolarAreaChart";
import UserImagesComponent from "../UserImagesComponent";
import "../App.css";
import { FaAward } from "react-icons/fa";
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import UserRankings from "../UserRankings";

// Function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

const UserProfile = () => {
  const [selectedLink, setSelectedLink] = useState("analytics");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      fetchUserData(userId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/auth/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
        },
      });
      fetchUserData(userId); // Fetch updated user data
      setShowModal(true); // Show the modal on success
      console.log(showModal);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7000/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
        },
      });
      const userData = response.data;
      setUserData(userData);
      setFormData(userData); // Initialize form data with user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <>
    <div>
      <div className="link-container " >
        <a
          href="#"
          style={{
            color: selectedLink === "profile" ? "var(--first-color)" : "#000",
            fontWeight: selectedLink === "profile" ? 500 : "normal",
          }}
          onClick={() => setSelectedLink("profile")}
        >
          Edit Profile
        </a>
        <span>|</span>
        <a
          href="#"
          style={{
            color: selectedLink === "analytics" ? "var(--first-color)" : "#000",
            fontWeight: selectedLink === "analytics" ? 500 : "normal",
          }}
          onClick={() => setSelectedLink("analytics")}
        >
          Analytics
        </a>
      </div>
      
      <section className={selectedLink === "profile" ? "main-content" : ""}>
        {selectedLink === "profile" && userData && (
          <>
            <div>
              <h2 style={{ textAlign: "center" }}>Welcome, {userData.first_name}</h2>
              <div style={{ textAlign: "center" }}>
                <p>Waste Wizard Badge</p>
                <FaAward style={{ fontSize: '3rem', color: 'green', margin: '0' }} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="username">Username</label>
                      <input className="form-control" type="text" id="username" name="username" value={formData.username || ''} onChange={handleChange} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="email">Email&nbsp;&nbsp;</label>
                      <input className="form-control" type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="phone">Phone</label>
                      <input className="form-control" type="text" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="first_name">First Name</label>
                      <input  className="form-control" type="text" id="first_name" name="first_name" value={formData.first_name || ''} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="last_name">Last Name</label>
                      <input className="form-control" type="text" id="last_name" name="last_name" value={formData.last_name || ''} onChange={handleChange} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="address">Address</label>
                      <input className="form-control" type="text" id="address" name="address" value={formData.address || ''} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="city">City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      <input className="form-control" type="text" id="city" name="city" value={formData.city || ''} onChange={handleChange} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="country">Country</label>
                      <input className="form-control" type="text" id="country" name="country" value={formData.country || ''} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="birthdate">Date of Birth</label>
                      <input className="form-control" type="date" id="birthdate" name="birthdate" value={formData.birthdate || ''} onChange={handleChange} placeholder="dd/mm/yyyy"/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <label htmlFor="goal_description">What's your recycling goal?</label>
                      <select
                        className="form-select"
                        id="goal_description"
                        name="goal_description"
                        value={formData.goal_description || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select an option...</option>
                        <option value="1">Fully committed. I want to recycle daily</option>
                        <option value="2">Reduce waste weekly</option>
                        <option value="3">Monthly waste audit</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className=''>
                  <div style={{ margin: "30px" }} className=''>
                    <p style={{ fontWeight: "normal", fontSize: "1rem" }}>Thanks for being an active member of ENVIROSENSE since <br /><b>{formatDate(userData.registration_date)}</b>!</p>
                  </div>
                </div>
                <button className="btn" style={{ backgroundColor: '#146c43', color: 'white' }} type="submit">Update Profile</button>
              </form>
            </div>
          </>
        )}
        {selectedLink === "analytics" && userData && (
          <>
            <div style={{ textAlign: "center" }}>
           <h2 style={{ textAlign: "center" }}>Waste Wizard Badge</h2>
              <FaAward style={{ fontSize: '3rem', color: 'green', margin: '0' }} />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <PolarAreaChart userData={userData} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="row">
                <ClassificationFrequencyChart userId={userData.id} />
                </div>                            
              </div>
              </div>

              <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <h4 style={{ textAlign: 'center', margin: '20px' }}>Remember all these recyclables?</h4>
                  <p style={{ fontWeight: 'normal' }}>They are not on the landfill thanks to you.</p>
                  <UserImagesComponent  userId={userData.id} />        
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
              </div>

              <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <UserEcologicalFootprintChart userId={userData.id} />                
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                </div>
              <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <UserRankings userId={userId} />      
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                </div>
            </div>
          </>
        )}
      </section>
    </div>
          
      {/* Modal for Update Confirmation */}
{showModal && (<>
  <div> Profile updated! </div>
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setShowModal(false)}>&times;</span>
      <p>Updates were successfully configured!</p>
    </div>
  </div></>
)}

    <div style={{height: '300px'}}></div>
    </>
  );
};

export default UserProfile;
