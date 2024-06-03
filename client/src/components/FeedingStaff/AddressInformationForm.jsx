import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function AddressInformationForm({ addressDetail, setAddressDetail }) {
  const [AreaVillOptions, setAreaVillOptions] = useState([]);
  const [AreaFullDetails, setAreaFullDetails] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressDetail(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const fetchAreaVillOptions = async (input, setter) => {
    try {
      const response = await fetch('/api/v1/feedingStaff/searchAreaVill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: input })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggested AreaVill');
      }

      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error('Error fetching suggested AreaVill:', error);
    }
  };

  const fetchAllAreaDetails = async (AreaId) => {
    try {
      const response = await fetch('/api/v1/feedingStaff/allAreaDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ AreaId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch all area details');
      }

      const data = await response.json();
      setAreaFullDetails(data);
      // Update addressDetail with the first area's details if there is only one area detail
      if (data.length === 1) {
        const [area] = data;
        setAddressDetail(prevDetails => ({
          ...prevDetails,
          EName: area.EName,
          TehId: area.TehId,
          ECouncil: area.ECouncil,
          CounId: area.CounId,
          EVidhanSabha: area.EVidhanSabha,
          VSId: area.VSId,
          EWardBlock: area.EWardBlock,
          WBId: area.WBId,
          ECBPanch: area.ECBPanch,
          ChkBlkId: area.ChkBlkId
        }));
      }
    } catch (error) {
      console.error('Error fetching all area details:', error);
    }
  };

  return (
    <div className='w-full h-full mx-auto my-5 px-2 py-4 bg-gray-100' style={{ boxShadow: "0 0 5px 1px #ddd" }}>
      <div className="container-fluid flex-col gap-2 flex">
        <div className='flex items-center justify-between py-3'>
          <div className='text-xl font-bold mb-4'>Address Information</div>
          <p className='select-none text-sm text-black'><sup>*</sup>fields are required</p>
        </div>
        <hr />
      </div>

      <div className="row flex mt-3">
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Area / Village</Form.Label>
            <Typeahead
              id="area-village-typeahead"
              onInputChange={(value) => fetchAreaVillOptions(value, setAreaVillOptions)}
              onChange={(selected) => {
                if (selected.length > 0) {
                  const [choice] = selected;
                  setAddressDetail(prevDetails => ({
                    ...prevDetails,
                    EAreaVill: choice.EAreaVill,
                    AreaId: choice.AreaId
                  }));
                  fetchAllAreaDetails(choice.AreaId);
                }
              }}
              options={AreaVillOptions}
              placeholder='Area/Village'
              labelKey={"EAreaVill"}
              renderMenuItemChildren={(option) => (
                <div>
                  {option.EAreaVill}
                </div>
              )}
            />
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Tehsil</Form.Label>
            {AreaFullDetails.length === 1 ? (
              <Form.Control
                type="text"
                className='px-2'
                name="EName"
                value={addressDetail.EName}
                readOnly
              />
            ) : (
              <Form.Control
                as="select"
                className='form-select px-2'
                name="TehId"
                value={addressDetail.TehId}
                onChange={handleChange}
                required
              >
                <option value="">--Select Tehsil--</option>
                {AreaFullDetails.map((tehsil) => (
                  <option key={tehsil.TehId} value={tehsil.TehId}>{tehsil.EName}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Nikaya</Form.Label>
            {AreaFullDetails.length === 1 ? (
              <Form.Control
                type="text"
                name="ECouncil"
                className='px-2'
                value={addressDetail.ECouncil}
                readOnly
                placeholder='Nikaya'
              />
            ) : (
              <Form.Control
                as="select"
                className='form-select px-2'
                name="CounId"
                value={addressDetail.CounId}
                onChange={handleChange}
                required
              >
                <option value="">--Select Nikaya--</option>
                {AreaFullDetails.map((council) => (
                  <option key={council.CounId} value={council.CounId}>{council.ECouncil}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>VidhanSabha</Form.Label>
            {AreaFullDetails.length === 1 ? (
              <Form.Control
                type="text"
                name="EVidhanSabha"
                className='px-2'
                value={addressDetail.EVidhanSabha}
                readOnly
                placeholder='VidhanSabha'
              />
            ) : (
              <Form.Control
                as="select"
                className='form-select px-2'
                name="VSId"
                value={addressDetail.VSId}
                onChange={handleChange}
                required
              >
                <option value="">--Select VidhanSabha--</option>
                {AreaFullDetails.map((VS) => (
                  <option key={VS.VSId} value={VS.VSId}>{VS.EVidhanSabha}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </div>

        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Ward/Block</Form.Label>
            {AreaFullDetails.length === 1 ? (
              <>
                <Form.Control
                  type="text"
                  name="EWardBlock"
                  className="px-2"
                  value={addressDetail.EWardBlock}
                  readOnly
                  placeholder="Ward/Block"
                />
                <Form.Control
                  type="hidden"
                  name="WBId"
                  value={addressDetail.WBId}
                  onChange={handleChange}
                />
              </>
            ) : (
              <Form.Control
                as="select"
                className='form-select px-2'
                name="WBId"
                value={addressDetail.WBId}
                onChange={handleChange}
                required
              >
                <option value="">--Select Ward/Block--</option>
                {AreaFullDetails.map((WB) => (
                  <option key={WB.WBId} value={WB.WBId}>{WB.EWardBlock}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Chak Block/ Panchayat</Form.Label>
            {AreaFullDetails.length === 1 ? (
              <Form.Control
                type="text"
                name="ECBPanch"
                className='px-2'
                value={addressDetail.ECBPanch}
                readOnly
                placeholder='Chak Block/ Panchayat'
              />
            ) : (
              <Form.Control
                as="select"
                className='form-select px-2'
                name="ChkBlkId"
                value={addressDetail.ChkBlkId}
                onChange={handleChange}
                required
              >
                <option value="">--Select Chak Block/ Panchayat--</option>
                {AreaFullDetails.map((CBP) => (
                  <option key={CBP.ChkBlkId} value={CBP.ChkBlkId}>{CBP.ECBPanch}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>HNo</Form.Label>
            <Form.Control
              type="text"
              name="HNo"
              className='px-2'
              value={addressDetail.HNo}
              onChange={handleChange}
              placeholder='HNo'
            />
          </Form.Group>
        </div>
        <div className="col-md-3 flex-col gap-2 flex mt-1">
          <Form.Group>
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              type="text"
              name="Landmark"
              className='px-2'
              value={addressDetail.Landmark}
              onChange={handleChange}
              placeholder='Landmark'
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default AddressInformationForm;
