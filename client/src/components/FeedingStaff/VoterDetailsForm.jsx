import React, {useState, useEffect}from 'react';
import { Form } from 'react-bootstrap';
import { Relation, Occupation } from '../Pages/Constaint.jsx';


function VoterDetailsForm({ voterDetails, setVoterDetails }) {

    const [casteOptions, setCasteOptions] = useState([]);

    useEffect(() => {
        const fetchCasteOptions = async (lastName) => {
            try {
                const response = await fetch('https://api.example.com/castes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lastName }),
                });
                const data = await response.json();
                setCasteOptions(data);
                if (data.length === 1) {
                    setVoterDetails(prevDetails => ({
                        ...prevDetails,
                        ECaste: data[0].name,
                        CasteId: data[0].id,
                    }));
                } else {
                    setVoterDetails(prevDetails => ({
                        ...prevDetails,
                        ECaste: "", // Reset if multiple or no options
                        CasteId: "", // Reset CasteId as well
                    }));
                }
            } catch (error) {
                console.error('Error fetching caste options:', error);
                setCasteOptions([]);
                setVoterDetails(prevDetails => ({
                    ...prevDetails,
                    ECaste: "", // Reset in case of error
                    CasteId: "", // Reset CasteId as well
                }));
            }
        };
        console.log(voterDetails);
        if (voterDetails.ELName) {
            fetchCasteOptions(voterDetails.ELName);
        } else {
            setCasteOptions([]);
            setVoterDetails(prevDetails => ({
                ...prevDetails,
                ECaste: "",
                CasteId: "",
            }));
        }
    }, [voterDetails.ELName, setVoterDetails]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVoterDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCasteChange = (event) => {
        const { value } = event.target;
        const selectedCaste = casteOptions.find(caste => caste.name === value);
        setVoterDetails(prevDetails => ({
            ...prevDetails,
            ECaste: value,
            CasteId: selectedCaste ? selectedCaste.id : "",
        }));
    };

    return (
        <>
            <div className='w-full h-full mx-auto my-5 px-2 py-4 bg-gray-100' style={{ boxShadow: "0 0 5px 1px #ddd" }}>
                <div className="container-fluid flex-col gap-2 flex">
                    <div className='flex items-center justify-between py-3'>
                        <div className='text-xl font-bold mb-4'>Voters Details</div>
                        <p className='select-none text-sm text-black'><sup>*</sup>fields are required</p>
                    </div>
                    <hr />
                </div>


                <div className="row mt-5">
                    <div className="col-md-3 mt-1">
                        <Form.Group>
                            <Form.Label>First Name (English)</Form.Label>
                            <Form.Control
                                className='px-2'
                                type="text"
                                name="EFName"
                                value={voterDetails.EFName}
                                onChange={handleChange}
                                placeholder="First Name (English)"
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 mt-1">
                        <Form.Group>
                            <Form.Label>First Name (Hindi)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="HFName"
                                value={voterDetails.HFName}
                                onChange={handleChange}
                                placeholder="First Name (Hindi)"
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 mt-1">
                        <Form.Group>
                            <Form.Label>Last Name (English)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="ELName"
                                value={voterDetails.ELName}
                                onChange={handleChange}
                                placeholder="Last Name (English)"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 mt-1">
                        <Form.Group>
                            <Form.Label>Last Name (Hindi)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="HLName"
                                value={voterDetails.HLName}
                                onChange={handleChange}
                                placeholder="Last Name (Hindi)"
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Relation</Form.Label>
                            <Form.Control
                                as="select"
                                className='form-select px-2' 
                                name="RType"
                                value={voterDetails.RType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--select relation--</option>
                                {Relation.map((c) => (
                                    <option key={c.value} value={c.value}>{c.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Rel. First Name (English)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="ERFName"
                                value={voterDetails.ERFName}
                                onChange={handleChange}
                                placeholder="Rel. First Name (English)"
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Rel. First Name (Hindi)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="HRFName"
                                value={voterDetails.HRFName}
                                onChange={handleChange}
                                placeholder="Rel. First Name (Hindi)"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Rel. Last Name (English)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="ERLName"
                                value={voterDetails.ERLName}
                                onChange={handleChange}
                                placeholder="Rel. Last Name (English)"
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row flex mt-5">
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Rel. Last Name (Hindi)</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="HRLName"
                                value={voterDetails.HRLName}
                                onChange={handleChange}
                                placeholder="Rel. Last Name (Hindi)"

                            />
                        </Form.Group>
                    </div>
               
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Caste</Form.Label>
                            <Form.Control
                                as="select"
                                className='form-select px-2'
                                name="ECaste"
                                value={voterDetails.ECaste}
                                onChange={handleCasteChange}
                                required
                            >
                                <option value="">--select caste--</option>
                                {casteOptions.map((caste, index) => (
                                    <option key={index} value={caste.name}>{caste.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Qualification</Form.Label>
                            <Form.Control
                                as="select"
                                className='form-select px-2' 
                                name="Qualification"
                                value={voterDetails.Qualification}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Select Qualification--</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Graduate">Graduate</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Occupation</Form.Label>
                            <Form.Control
                                as="select"
                                className='form-select px-2' 
                                name="Occupation"
                                value={voterDetails.Occupation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Select Occupation--</option>
                                {Occupation.map((c) => (
                                    <option key={c.value} value={c.value}>{c.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>

                <div className="row flex mt-5">
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                className='form-select px-2' 
                                name="Sex"
                                value={voterDetails.Sex}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Select Gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Third Gender">Third Gender</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="MNo"
                                value={voterDetails.MNo}
                                onChange={handleChange}
                                placeholder="Mobile No"
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Mobile No.2</Form.Label>
                            <Form.Control
                                type="text"
                                name="MNo2"
                                className='px-2'
                                value={voterDetails.MNo2}
                                onChange={handleChange}
                                placeholder="Mobile No 2"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Aadhar No</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="AadharNo"
                                inputMode="numeric"
                                pattern="\d{12}"
                                value={voterDetails.AadharNo}
                                onChange={handleChange}
                                placeholder="Aadhar No"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>VoterId</Form.Label>
                            <Form.Control
                                className='px-2'
                                type="text"
                                name="VIdNo"
                                value={voterDetails.VIdNo}
                                onChange={handleChange}
                                placeholder="VoterId"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Graduate Comp Year</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="GCYear"
                                value={voterDetails.GCYear}
                                onChange={handleChange}
                                placeholder="Graduate Comp Year"
                                required
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className='flex items-center justify-between py-4'>
                    <div className='text-xl text-black'>Address Information</div>
                </div>

                {/* Address Information Fields */}
                {/* Uncomment and update as needed */}
                <div className="row flex mt-3">
                    <div className="col-md-3 flex-col gap-2 flex mt-1">
                        <Form.Group>
                            <Form.Label>Area / Village</Form.Label>
                            <Form.Control
                                type="text"
                                className='px-2'
                                name="AreaId"
                                value={voterDetails.AreaId}
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
                                value={voterDetails.DistrictId}
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
                                value={voterDetails.StateId}
                                onChange={handleChange}
                                placeholder='State'
                            />
                        </Form.Group>
                    </div>
                </div>

            </div>
        </>
    );
}

export default VoterDetailsForm;
