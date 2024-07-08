import React from 'react';

const CharacteristicForm = ({ characteristic, handleInputChange }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`componentName_${characteristic.id}`}>Component</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`componentName_${characteristic.id}`}
            value={characteristic.Characteristic.Component.name || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Component.name')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`materialName_${characteristic.id}`}>Material</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`materialName_${characteristic.id}`}
            value={characteristic.Characteristic.Material.name || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Material.name')}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`percentage_${characteristic.id}`}>Percentage</label>
          <input
            className="form-control form-control-lg"
            type="number"
            id={`percentage_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.percentage) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.percentage')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`env_impact_${characteristic.id}`}>Environmental Impact</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`env_impact_${characteristic.id}`}
            value={characteristic.Characteristic.env_impact || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.env_impact')}
          />
        </div>
      </div>
      

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`disposal_${characteristic.id}`}>Disposal method</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`disposal_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.disposal_method) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.disposal_method')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`compliance_${characteristic.id}`}>Regulatory compliance</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`compliance_${characteristic.id}`}
            value={characteristic.Characteristic.regulatory_compliance || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.regulatory_compliance')}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`materialDescription_${characteristic.id}`}>Material description</label>
          <textarea
            className="form-control form-control-lg"
            type="text"
            id={`materialDescription_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.Material.description) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Material.description')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`componentDescription_${characteristic.id}`}>Component description</label>
          <textarea
            className="form-control form-control-lg"
            type="text"
            id={`componentDescription_${characteristic.id}`}
            value={characteristic.Characteristic.regulatory_compliance || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Component.description')}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`additionalInfo_${characteristic.id}`}>Additional info</label>
          <textarea
            className="form-control form-control-lg"
            type="text"
            id={`additionalInfo_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.Additional_Info) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Additional_Info')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`componentDescription_${characteristic.id}`}>Volume</label>
          <input
            className="form-control form-control-lg"
            type="number"
            id={`volume_${characteristic.id}`}
            value={characteristic.Characteristic.volume || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.volume')}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`cost_${characteristic.id}`}>Cost Per Unit</label>
          <input
            className="form-control form-control-lg"
            type="number"
            id={`cost_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.cost) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.cost')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`weight_${characteristic.id}`}>Weight</label>
          <input
            className="form-control form-control-lg"
            type="number"
            id={`weight_${characteristic.id}`}
            value={characteristic.Characteristic.weight || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.weight')}
          />
        </div>
      </div>


      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`ecoType_${characteristic.id}`}>Ecological type</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`ecoType_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.Material.eco_type) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Material.eco_type')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`ecoScore_${characteristic.id}`}>Ecological score</label>
          <input
            className="form-control form-control-lg"
            type="number"
            id={`ecoScore_${characteristic.id}`}
            value={characteristic.Characteristic.Material.ecoScore || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.Material.eco_score')}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`facility_${characteristic.id}`}>Facility</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`facility_${characteristic.id}`}
            value={parseFloat(characteristic.Characteristic.facility) || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.facility')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`footprint_${characteristic.id}`}>Footprint</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id={`footprint_${characteristic.id}`}
            value={characteristic.Characteristic.footprint || ''}
            onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.footprint')}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
          <label htmlFor={`facility_${characteristic.id}`}>Is it recyclable?</label>
          <input className="form-check-input"
                type="checkbox"
                id={`recyclable_${characteristic.id}`}
                checked={characteristic.Characteristic.isrecyclable || ''}
                onChange={(event) => handleInputChange(event, characteristic.id, 'Characteristic.isrecyclable')}
          />
        </div>
        <div className='col-6 col-md-6 col-sm-12 col-xs-12'>
        </div>
      </div>



      {/* Add more fields as needed */}
    </div>
  );
};

export default CharacteristicForm;
