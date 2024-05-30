import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function AddressInformationForm(
  addressDetail,
  setAddressDetail
) {



  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoterDetails(prevDetails => ({
        ...prevDetails,
        [name]: value,
    }));
};

  return (
    <>
      <div className='flex items-center justify-between py-4'>
        <div className='text-xl text-black'>Address Information</div>
      </div>


      <div className="row flex mt-3">
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Area / Village</Form.Label>
            <Form.Control
              type="text"
              className='px-2'
              name="AreaId"
              value={addressDetail.AreaId}
              onChange={handleChange}
              placeholder='Area/Village'
            />
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>District</Form.Label>
            <Form.Control
              type="text"
              name="DistrictId"
              className='px-2'
              value={addressDetail.DistrictId}
              onChange={handleChange}
              placeholder='District'
            />
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="StateId"
              className='px-2'
              value={addressDetail.StateId}
              onChange={handleChange}
              placeholder='State'
            />
          </Form.Group>
        </div>
      </div>



    </>
  )
}

export default AddressInformationForm