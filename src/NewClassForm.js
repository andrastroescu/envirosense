import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import CharacteristicForm from './CharacteristicForm';

const NewClassForm = () => {
  const [className, setClassName] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  const [currentCharacteristicIndex, setCurrentCharacteristicIndex] = useState(0);

  const handleInputChange = (event, id, field) => {
    const { value, type, checked } = event.target;
    setCharacteristics(prevCharacteristics => {
      const updatedCharacteristics = prevCharacteristics.map(characteristic => {
        if (characteristic.id === id) {
          let updatedCharacteristic = { ...characteristic };
          let ref = updatedCharacteristic;
          const fieldParts = field.split('.');
          for (let i = 0; i < fieldParts.length - 1; i++) {
            ref = ref[fieldParts[i]];
          }
          ref[fieldParts[fieldParts.length - 1]] = type === 'checkbox' ? checked : value;
          return updatedCharacteristic;
        }
        return characteristic;
      });
      return updatedCharacteristics;
    });
  };

  const saveChanges = () => {
    console.log('Saved class name:', className);
    console.log('Saved characteristics:', characteristics);
  };

  const handleDeleteCharacteristic = id => {
    setCharacteristics(prevCharacteristics =>
      prevCharacteristics.filter(characteristic => characteristic.id !== id)
    );
  };

  const addCharacteristic = () => {
    const newCharacteristic = {
      id: characteristics.length + 1,
      Characteristic: {
        Component: {
          name: '',
          isrecyclable: false,
          description: ''
        },
        Material: {
          name: '',
          description: '',
          eco_type: '',
          eco_score: 0
        },
        percentage: 0,
        env_impact: '',
        disposal_method: '',
        regulatory_compliance: '',
        volume: 0,
        cost: 0,
        weight: 0,
        source: '',
        facility: '',
        footprint: ''
      },
      spec: '',
      Additional_Info: ''
    };

    setCharacteristics(prevCharacteristics => [...prevCharacteristics, newCharacteristic]);
    setCurrentCharacteristicIndex(characteristics.length); // Set index to new characteristic
  };

  return (
    <form>
      <p> Insert a new object below </p>
      <div className="form-group">
        
        <input
          type="text"
          className="form-control"
          id="className"
          value={className}
          placeholder='E.g. Plastic Bottle'
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>

      {characteristics.length === 0 ? (
        <div>
          <p>No characteristics available. Please add a new characteristic.</p>
          <button type="button" className="btn btn-success" onClick={addCharacteristic}>
            Add Characteristic
          </button>
        </div>
      ) : (
        <div>
          {characteristics.map((characteristic, index) => (
            <div key={characteristic.id} className="form-group">
              <p style={{ fontWeight: 'normal' }}>Product feature #{index + 1}</p>
              <hr style={{ color: '#146c43', width: '50%', margin: '0 auto', paddingBottom: '40px' }}></hr>
              <CharacteristicForm
                characteristic={characteristic}
                handleInputChange={(event, id, field) => handleInputChange(event, characteristic.id, field)}
              />
              <div className="d-flex justify-content-between" style={{ maxWidth: '50%', margin: '0 auto' }}>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: '#146c43', color: 'white' }}
                  onClick={() => setCurrentCharacteristicIndex(index - 1)}
                  disabled={index === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: '#146c43', color: 'white' }}
                  onClick={() => setCurrentCharacteristicIndex(index + 1)}
                  disabled={index === characteristics.length - 1}
                >
                  Next
                </button>
              </div>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteCharacteristic(characteristic.id)}>
                Delete Characteristic
              </button>
            </div>
          ))}

          {/* Save changes and add new characteristic buttons */}
          <button type="button" className="btn btn-success" onClick={saveChanges}>
            Save Changes
          </button>
          <button className='btn btn-success' onClick={addCharacteristic}>
            Add Characteristic
          </button>
        </div>
      )}
    </form>
  );
};

export default NewClassForm;
