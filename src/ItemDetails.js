import React from 'react';
import { FaInfoCircle, FaBoxOpen, FaCogs, FaLeaf, FaExclamationTriangle, FaMapMarkerAlt, FaTrashAlt, FaDollarSign, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ItemDetails = ({ item, handleNext, handlePrevious, currentIndex, totalItems }) => {
  return (
    <ul style={{ listStyle: 'none', padding: '0' }}>
      <li style={{ marginBottom: '20px', padding: '40px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
        <p><FaInfoCircle /> <strong>Description:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.description}</span></p>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <FaArrowLeft 
          onClick={handlePrevious} 
          className="control-icon" 
          style={{ fontSize: '2rem', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', color: currentIndex === 0 ? '#ccc' : '#000' }} 
        />
          
        <span>Recyclable component {currentIndex + 1} of {totalItems}</span>
        <FaArrowRight 
          onClick={handleNext} 
          className="control-icon" 
          style={{ fontSize: '2rem', cursor: currentIndex === totalItems - 1 ? 'not-allowed' : 'pointer', color: currentIndex === totalItems - 1 ? '#ccc' : '#000' }} 
        />
      </div>
      
        <hr />

        <p><FaCogs /> <strong>Component:</strong> <span style={{ color: 'gray', fontWeight: 'bold', textTransform:'uppercase', fontSize: '1.1rem' }}> {item.material} </span></p>
        <p><FaBoxOpen /> <strong>Material:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.component} ({item.percentage}%)</span></p>
        <p><FaLeaf /> <strong>About this material:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.material_description}</span></p>
        <p><FaInfoCircle /> <strong>Good to know:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.additional_info}</span></p>
        <p><FaDollarSign /> <strong>Cost savings calculation:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}> Ever wondered about the financial benefits of recycling? By recycling 100 units of {item.component}, you could save approximately {item.cost} in material costs per batch of items recycled!</span></p>
        <p><FaInfoCircle /> <strong>Component description:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}> {item.comp_description}</span></p>
        <p><FaMapMarkerAlt /> <strong>Where to recycle?</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}> {item.comp_storage_location}, {item.facility} </span></p>
        <p><FaTrashAlt /> <strong>Disposal method:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}> {item.disposal_method}</span></p>
        <p><FaExclamationTriangle /> <strong>Environmental impact:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.env_impact}</span></p>
        <p><strong>Regulatory compliance:</strong><span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}> {item.regulatory_compliance}</span></p>
        <p><FaInfoCircle /> <strong>Notes:</strong> <span style={{ color: 'gray', fontWeight: 'normal', fontSize: '1.1rem' }}>{item.notes}</span></p>
      </li>
    </ul>
  );
};

export default ItemDetails;
