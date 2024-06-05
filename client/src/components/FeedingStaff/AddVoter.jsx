import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReferenceDetailsForm from './ReferenceDetailsForm.jsx';
import VoterDetailsForm from './VoterDetailsForm.jsx';
import AddressInformationForm from './AddressInformationForm.jsx';
import VoterDocs from './VoterDocs.jsx';
import { Occupation } from '../Pages/Constaint.jsx';

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
        CasteId: "",
        ECaste: '',
        Qualification: '',
        Occupation: Occupation?'':"NA",
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            formData.append('referenceDetails', JSON.stringify({
                IncRefId: referenceDetails.IncRefId,
                PacketNo: referenceDetails.PacketNo
            }));
            formData.append('voterDetails', JSON.stringify(voterDetails));
            formData.append('addressDetail', JSON.stringify(addressDetail));

            Object.keys(voterDocs).forEach(key => {
                if (voterDocs[key].file) {
                    formData.append(key, voterDocs[key].file);
                }
            });
    

            const result = await fetch('/api/v1/feedingStaff/addVoter', {
                method: 'POST',
                body: formData,

            });
    
            if (result.ok) {
                toast.success('Voters Added Successfully.');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error(`Error in Adding Voters: ${result.statusText}`);
            }
        } catch (error) {
            toast.error(`Error in Adding Voters: ${error.message}`);
        }
    };
    

    return (
        <main className="bg-gray-100">
            <ToastContainer />
            <div className="container py-4 text-black">
                <Form onSubmit={handleSubmit} className="Council-form">
                   
                   <ReferenceDetailsForm
                        referenceDetails= {referenceDetails}
                        setReferenceDetails= {setReferenceDetails}
                   
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
