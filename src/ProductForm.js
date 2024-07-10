import { FaTrash, FaRecycle, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import the trash icon from Font Awesome
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NewClassForm from './NewClassForm';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import NewClassComponent from './NewClassComponent';

const ProductForm = () => {
    const [userRole, setUserRole] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [classDetails, setClassDetails] = useState(null);
    const [showNewClassForm, setShowNewClassForm] = useState(false);
    const [currentCharacteristicIndex, setCurrentCharacteristicIndex] = useState(0);
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [availableCharacteristics, setAvailableCharacteristics] = useState([]);
    const navigate = useNavigate(); // Initialize useHistory hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken); // Log decoded token to inspect its contents
            const userRole = decodedToken.role;
            const userFirstName = decodedToken.firstName;
            console.log(userRole); // Log user role to verify its value
            setUserRole(userRole);
            setUserFirstName(userFirstName)
        }
    }, []);

    // Function to fetch classes data
    const fetchClasses = async () => {
        try {
            const response = await axios.get('https://orca-app-tue3f.ondigitalocean.app/crud/classes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
                },
            });
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
            navigate('/login');
        }
    };

    const fetchClassDetails = async (classId) => {
        try {
            const response = await axios.get(`https://orca-app-tue3f.ondigitalocean.app/crud/class/${classId}/details`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
                },
            });
            setClassDetails(response.data);
            const characteristicsLabels = response.data.ClassCharacteristics.map(characteristic => Object.keys(characteristic.Characteristic));
            const materialLabels = response.data.ClassCharacteristics.map(characteristic => Object.keys(characteristic.Characteristic.Material));
            const componentLabels = response.data.ClassCharacteristics.map(characteristic => Object.keys(characteristic.Characteristic.Component));
    
            const allLabels = [...characteristicsLabels.flat(), ...materialLabels.flat(), ...componentLabels.flat()];
            const uniqueLabels = [...new Set(allLabels)];
            console.log("unique labels:");
            console.log(uniqueLabels);

            setAvailableCharacteristics(uniqueLabels);
        } catch (error) {
            console.error('Error fetching class details:', error);
        }
    };

    const handleClassChange = (event) => {
        const selectedId = event.target.value;
        setSelectedClass(selectedId);
        if (selectedId) {
            fetchClassDetails(selectedId);
        } else {
            setClassDetails(null);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleInputChange = (event, characteristicId, fieldPath) => {
        const { type, value, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        console.log(`Changing field: ${fieldPath} to value: ${inputValue}`); // Log the change

        const updatedDetails = {
            ...classDetails,
            ClassCharacteristics: classDetails.ClassCharacteristics.map((characteristic) => {
                if (characteristic.id === characteristicId) {
                    const updatedCharacteristic = { ...characteristic };
    
                    const fieldKeys = fieldPath.split('.');
                    let currentLevel = updatedCharacteristic;
                    for (let i = 0; i < fieldKeys.length - 1; i++) {
                        const key = fieldKeys[i];
                        if (!currentLevel[key]) {
                            // If the current key doesn't exist, create an empty object
                            currentLevel[key] = {};
                        }
                        // Move to the next level
                        currentLevel = currentLevel[key];
                    }
    
                    // Update the final field with the input value
                    currentLevel[fieldKeys[fieldKeys.length - 1]] = inputValue;
    
                    console.log('Updated Characteristic:', updatedCharacteristic);
                    return updatedCharacteristic;
                }
                return characteristic;
            }),
        };
    console.log('Updated Details:', updatedDetails);
    setClassDetails(updatedDetails);
};

    const saveChanges = async () => {
        try {
            await axios.put(`https://orca-app-tue3f.ondigitalocean.app/crud/class/${selectedClass}/details`, classDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
                },
            });
            console.log(JSON.stringify(classDetails));
            console.log('Changes saved successfully!');
            setSuccessMessage("Changes saved successfully!");
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleDeleteClass = async () => {
        try {
            await axios.delete(`https://orca-app-tue3f.ondigitalocean.app/crud/class/${selectedClass}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
                },
            });
            setSelectedClass('');
            setClassDetails(null);
            fetchClasses();
            console.log('Class deleted successfully!');
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    const handleAddNewClass = () => {
        // Set showNewClassForm to true to display the new class form
        setShowNewClassForm(true);
        setClassDetails(null); // Clear existing class details
        setSelectedClass(''); // Clear selected class
    };

    const handleCancelNewClass = () => {
        // Set showNewClassForm to false to hide the new class form
        setShowNewClassForm(false);
    };

    const handleNewClassFormSubmit = async (formData) => {
        try {
            // Make an HTTP request to create a new class
            await axios.post('https://orca-app-tue3f.ondigitalocean.app/crud/classes', { name: formData }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
                },
            });
            // Optionally, handle the response or update the UI
            console.log('New class created successfully!');
            // Fetch updated classes
            fetchClasses();
            // Hide the new class form
            setShowNewClassForm(false);
        } catch (error) {
            console.error('Error adding new class:', error);
        }
    };

    const handleNextCharacteristic = () => {
        if (currentCharacteristicIndex < classDetails.ClassCharacteristics.length - 1) {
            setCurrentCharacteristicIndex(currentCharacteristicIndex + 1);
        }
    };

    const handlePreviousCharacteristic = () => {
        if (currentCharacteristicIndex > 0) {
            setCurrentCharacteristicIndex(currentCharacteristicIndex - 1);
        }
    };

    return (
        <>
        <main style={{marginTop: '150px'}} className='main-content'>
             {successMessage ? (
                <section className="success-page">
                    <p>{successMessage}</p>
                    <button className="btn" style={{backgroundColor: '#146c43', color: 'white'}} onClick={() => setSuccessMessage('')}>
                        Back to Form
                    </button>
                </section>
            ) : (
            <section className=""> 
                <p style={{fontSize: '1.5rem'}}> Hi there, <b> { userFirstName != null ? userFirstName : "Admin"}!</b> </p>
                {userRole === 'admin' ? (
                <>
                 {showNewClassForm ? (
                    <div>
                        <NewClassForm onSubmit={handleNewClassFormSubmit} onCancel={handleCancelNewClass} availableCharacteristics={availableCharacteristics}/>
                    </div>
                ) : (    
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <p> Keep your recyclables database up-to-date </p><FaRecycle style={{ color: '#146c43', fontSize: '1.5rem', marginLeft: '10px'}}/></div> <br/>
                        { selectedClass !== '' ? (
                        <p style={{fontWeight: 'normal'}}> You're now editing:</p>
                        ) : <p></p>}
                        <div className="form-group">
                            <select className="form-control form-control-lg"
                                id="class"
                                style={{textAlign: 'center', fontWeight: 'bold'}}
                                value={selectedClass}
                                onChange={handleClassChange}
                                required>
                                <option value="">Select a class</option>
                                {classes.map((classItem) => (
                                    <option key={classItem.id} value={classItem.id}>
                                        {classItem.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {classDetails && (
                            <form> <br/> <br/>
                               {console.log('Current Characteristic Index:', currentCharacteristicIndex)}
                               {console.log('Current Characteristic Length:', classDetails.ClassCharacteristics.length)}

                                {classDetails.ClassCharacteristics.length > 0 && (
                                    <div key={classDetails.ClassCharacteristics[currentCharacteristicIndex].id} className="form-group">
                                        <p style={{fontWeight: 'normal'}}> Product feature #{currentCharacteristicIndex + 1} </p>
                                        <hr style={{color: '#146c43', width: '50%', margin: '0 auto', paddingBottom: '40px'}}></hr>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`componentName_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Component</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`componentName_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Component.name}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Component.name')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`materialName_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Material</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`materialName_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Material.name}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Material.name')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`percentage_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Percentage</label>
                                                    <input className="form-control form-control-lg"
                                                        type="number"
                                                        id={`percentage_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={parseFloat(classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.percentage)}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.percentage')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`env_impact_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Environmental Impact</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`env_impact_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.env_impact || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.env_impact')}
                                                    />
                                                </div>
                                            </div>
    
                                            <label htmlFor={`recyclable_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Recyclable</label>
                                            <div>
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id={`recyclable_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                    checked={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Component.isrecyclable}
                                                    onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Component.isrecyclable')}
                                                />
                                            </div>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`disposal_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Disposal Method</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`disposal_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.disposal_method || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.disposal_method')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`compliance_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Regulatory Compliance</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`compliance_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.regulatory_compliance || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.regulatory_compliance')}
                                                    />
                                                </div>
                                            </div>
                                            <label htmlFor={`materialDescription_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Material description</label>
                                            <textarea className="form-control form-control-lg"
                                                id={`materialDescription_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Material.description|| ''}
                                                onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Material.description')}
                                            />
                                            <label htmlFor={`componentDescription_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Component description</label>
                                            <textarea className="form-control form-control-lg"
                                                id={`componentDescription_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Component.description|| ''}
                                                onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Component.description')}
                                            />
                                            <label htmlFor={`spec_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Specification</label>
                                            <input className="form-control form-control-lg"
                                                type="text"
                                                id={`spec_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                value={classDetails.ClassCharacteristics[currentCharacteristicIndex].spec}
                                                onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'spec')}
                                            />
                                            <label htmlFor={`additionalInfo_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Additional Info</label>
                                            <textarea className="form-control form-control-lg"
                                                id={`additionalInfo_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Additional_Info || ''}
                                                onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Additional_Info')}
                                            />
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`volume_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Volume</label>
                                                    <input className="form-control form-control-lg"
                                                        type="number"
                                                        id={`volume_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.volume || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.volume')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`cost_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Cost Per Unit</label>
                                                    <input className="form-control form-control-lg"
                                                        type="number"
                                                        id={`cost_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.cost || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.cost')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`weight_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Weight</label>
                                                    <input className="form-control form-control-lg"
                                                        type="number"
                                                        id={`weight_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.weight || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.weight')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`source_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Source</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`source_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.source || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.source')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`facility_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Facility</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`facility_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.facility || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.facility')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`footprint_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Footprint</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`footprint_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.footprint || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.footprint')}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`ecoType_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Ecological type</label>
                                                    <input className="form-control form-control-lg"
                                                        type="text"
                                                        id={`ecoType_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Material.eco_type || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Material.eco_type')}
                                                    />
                                                </div>
                                                <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                                    <label htmlFor={`ecoScore_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}>Ecological score</label>
                                                    <input className="form-control form-control-lg"
                                                        type="number"
                                                        id={`ecoScore_${classDetails.ClassCharacteristics[currentCharacteristicIndex].id}`}
                                                        value={classDetails.ClassCharacteristics[currentCharacteristicIndex].Characteristic.Material.eco_score || ''}
                                                        onChange={(event) => handleInputChange(event, classDetails.ClassCharacteristics[currentCharacteristicIndex].id, 'Characteristic.Material.eco_score')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Display navigation buttons */}
                                <div className="d-flex justify-content-between" style={{ maxWidth: '50%', margin: '0 auto'}}>
                                    <button
                                        className="btn"
                                        style={{backgroundColor: '#146c43', color: 'white'}}
                                        onClick={() => setCurrentCharacteristicIndex(currentCharacteristicIndex - 1)}
                                        disabled={currentCharacteristicIndex === 0}
                                    >
                                        Previous

                                    </button>
        
                                    <button
                                        className="btn"
                                        style={{backgroundColor: '#146c43', color: 'white'}}
                                        onClick={() => setCurrentCharacteristicIndex(currentCharacteristicIndex + 1)}
                                        disabled={currentCharacteristicIndex === classDetails.ClassCharacteristics.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                                <button className="btn btn-success" onClick={saveChanges}>Save Changes</button>
                                <FaTrash onClick={handleDeleteClass} style={{ position: 'relative', top: '100px', left: '240px', cursor: 'pointer', fontSize: '20px' }} />
                            </form>
                        )}
                        <button className="btn btn-success" onClick={handleAddNewClass}>Add New Class</button>
                        {/* Conditional rendering of NewClassForm */}
                        {showNewClassForm && (
                            <NewClassComponent onSubmit={handleNewClassFormSubmit} onCancel={handleCancelNewClass} />
                        )}
                    </div> )} </>
                ) : (
                    <div>
                        <p> You don't have access to this page. Ask your admin for assistance.</p>
                        <p className="text-sm text-center" style={{margin: 10}}>
                                Already have an admin account?{' '}
                                <NavLink to="/login">
                                    Sign in
                                </NavLink>
                         </p>
                         <p className="text-sm text-center" style={{margin: 10}}>
                               OR <br/> You can edit your user profile {' '}
                                <NavLink to="/user-profile">
                                    Go to my profile
                                </NavLink>
                         </p>
                    </div> 
                )} 
            </section> )}
        </main>
          <div style={{height: '100px'}}></div>
          </>
    );

 };

export default ProductForm;