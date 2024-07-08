import React, { useState } from 'react';
import NewClassForm from './NewClassForm';

const initialClassDetails = {
  className: '',
  ClassCharacteristics: []
};

const NewClassComponent = () => {
  const [classDetails, setClassDetails] = useState(initialClassDetails);
  const [currentCharacteristicIndex, setCurrentCharacteristicIndex] = useState(0);

  const handleInputChange = (event, id, field) => {
    const { value, type, checked } = event.target;
    setClassDetails(prevState => {
      const updatedCharacteristics = prevState.ClassCharacteristics.map(characteristic => {
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
      return { ...prevState, ClassCharacteristics: updatedCharacteristics };
    });
  };

  const handleClassDetailsChange = (event) => {
    const { name, value } = event.target;
    setClassDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveChanges = () => {
    console.log('Saved class details:', classDetails);
  };

  const handleDeleteClass = () => {
    console.log('Class deleted');
  };

  const addCharacteristic = () => {
    const newCharacteristic = {
      id: classDetails.ClassCharacteristics.length + 1,
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

    setClassDetails(prevState => ({
      ...prevState,
      ClassCharacteristics: [...prevState.ClassCharacteristics, newCharacteristic]
    }));

    setCurrentCharacteristicIndex(classDetails.ClassCharacteristics.length); // Set index to new characteristic
  };

  return (
    <div>
      <h2>New Class and Characteristics</h2>
      <form>
        <div className="form-group">
          <label htmlFor="className">Class Name</label>
          <input
            type="text"
            className="form-control"
            id="className"
            name="className"
            value={classDetails.className}
            onChange={handleClassDetailsChange}
          />
        </div>
      </form>
      <NewClassForm
        classDetails={classDetails}
        currentCharacteristicIndex={currentCharacteristicIndex}
        setCurrentCharacteristicIndex={setCurrentCharacteristicIndex}
        handleInputChange={handleInputChange}
        saveChanges={saveChanges}
        handleDeleteClass={handleDeleteClass}
        addCharacteristic={addCharacteristic}
      />
    </div>
  );
};

export default NewClassComponent;
