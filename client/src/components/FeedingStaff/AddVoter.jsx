import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReferenceDetailsForm from './ReferenceDetailsForm.jsx';
import VoterDetailsForm from './VoterDetailsForm.jsx';
import AddressInformationForm from './AddressInformationForm.jsx';
import VoterDocs from './VoterDocs.jsx';
import { Occupation } from '../Pages/Constaint.jsx';
import { validateVoterDetails } from '../../Validation/voterDetailsValidation.js';
import { validateReferenceDetails } from '../../Validation/refrenceDetailsValidation.js';
function AddVoter() {
    const [referenceDetails, setReferenceDetails] = useState({
        PacketNo: '',
        IncRefId: '',
        VMob1: '',
        VMob2: '',
        VEName: '',
        VHName: '',
        VEAddress: '',
        VHAddress: '',
        COList: [
            {
                VMob1: '',
                VEName: '',
                VHName: '',
            },
        ],
    });

    const [voterDetails, setVoterDetails] = useState({
        EFName: '',
        HFName: '',
        ELName: '',
        HLName: '',
        RType: '',
        ERFName: '',
        HRFName: '',
        ERLName: '',
        HRLName: '',
        CasteId: '',
        ECaste: '',
        Qualification: '',
        Occupation: Occupation ? '' : 'NA',
        Age: '',
        DOB: '',
        Sex: '',
        MNo: '',
        MNo2: '',
        AadharNo: '',
        VIdNo: '',
        GCYear: '',
    });

    const [addressDetail, setAddressDetail] = useState({
        AreaId: '',
        EAreaVill: '',
        TehId: '',
        EName: '',
        CounId: '',
        ECouncil: '',
        VSId: '',
        EVidhanSabha: '',
        WBId: '',
        EWardBlock: '',
        ChkBlkId: '',
        ECBPanch: '',
        HNo: '',
        Landmark: '',
    });

    const [voterDocs, setVoterDocs] = useState({
        Image: '',
        IdProof: '',
        Degree: '',
        VImage: '',
    });

    const [errors, setErrors] = useState({
        referenceDetails: {},
        voterDetails: {},
        addressDetail: {},
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const voterDetailErrors = {};
        const referenceDetailsErrors = {};

        // Validate voter details
        Object.keys(voterDetails).forEach((field) => {
            const error = validateVoterDetails(field, voterDetails[field]);
            if (error) {
                voterDetailErrors[field] = error;
            }
        });

        if (Object.keys(voterDetailErrors).length > 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                voterDetails: voterDetailErrors,
            }));
        }
            Object.keys(referenceDetails).forEach((field) => {
                const error = validateReferenceDetails(field, referenceDetails[field]);
                if (error) {
                    referenceDetailsErrors[field] = error;
                }
            });

            if (Object.keys(referenceDetailsErrors).length > 0) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    referenceDetails: referenceDetailsErrors,
                }));
                toast.error('Please fix the errors in the form.');
                return;
            }

            try {
                const formData = new FormData();

                formData.append('referenceDetails', JSON.stringify({
                    IncRefId: referenceDetails.IncRefId,
                    PacketNo: referenceDetails.PacketNo,
                }));
                formData.append('voterDetails', JSON.stringify(voterDetails));
                formData.append('addressDetail', JSON.stringify(addressDetail));

                Object.keys(voterDocs).forEach(key => {
                    if (voterDocs[key].file) {
                        formData.append(key, voterDocs[key].file);
                    }
                });

                const response = await fetch('/api/v1/feedingStaff/create-voter', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to create voter');
                }

                const data = await response.json();
                toast.success('Voter created successfully!');

                // Reset forms after successful submission
                setReferenceDetails({
                    PacketNo: '',
                    IncRefId: '',
                    VMob1: '',
                    VMob2: '',
                    VEName: '',
                    VHName: '',
                    VEAddress: '',
                    VHAddress: '',
                    COList: [
                        {
                            VMob1: '',
                            VEName: '',
                            VHName: '',
                        },
                    ],
                });
                setVoterDetails({
                    EFName: '',
                    HFName: '',
                    ELName: '',
                    HLName: '',
                    RType: '',
                    ERFName: '',
                    HRFName: '',
                    ERLName: '',
                    HRLName: '',
                    CasteId: '',
                    ECaste: '',
                    Qualification: '',
                    Occupation: Occupation ? '' : 'NA',
                    Age: '',
                    DOB: '',
                    Sex: '',
                    MNo: '',
                    MNo2: '',
                    AadharNo: '',
                    VIdNo: '',
                    GCYear: '',
                });
                setAddressDetail({
                    AreaId: '',
                    EAreaVill: '',
                    TehId: '',
                    EName: '',
                    CounId: '',
                    ECouncil: '',
                    VSId: '',
                    EVidhanSabha: '',
                    WBId: '',
                    EWardBlock: '',
                    ChkBlkId: '',
                    ECBPanch: '',
                    HNo: '',
                    Landmark: '',
                });
                setVoterDocs({
                    Image: '',
                    IdProof: '',
                    Degree: '',
                    VImage: '',
                });
                setErrors({
                    referenceDetails: {},
                    voterDetails: {},
                    addressDetail: {},
                });
            } catch (error) {
                toast.error('Error creating voter.');
            }
        };

        return (
            <main className="bg-gray-100">
                <ToastContainer />
                <div className="container py-4 text-black">
                    <Form onSubmit={handleSubmit} className="Council-form">
                        <ReferenceDetailsForm
                            referenceDetails={referenceDetails}
                            setReferenceDetails={setReferenceDetails}

                        />

                        <VoterDetailsForm
                            voterDetails={voterDetails}
                            setVoterDetails={setVoterDetails}

                        />

                        <AddressInformationForm
                            addressDetail={addressDetail}
                            setAddressDetail={setAddressDetail}

                        />

                        <VoterDocs
                            voterDocs={voterDocs}
                            setVoterDocs={setVoterDocs}
                        />

                        <Button type="submit" className="mt-4">Submit</Button>
                    </Form>
                </div>
            </main>
        );
    }

    export default AddVoter;
