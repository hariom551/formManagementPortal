import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import VoterDetailsForm from '../FeedingStaff/VoterDetailsForm.jsx';
import ReferenceDetailsForm from './ReferenceDetailsForm.jsx';
import VoterDetailsForm from './VoterDetailsForm.jsx';
import AddressInformationForm from './AddressInformationForm.jsx';

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
        Occupation: '',
        Age: '',
        DOB: '',
        Sex: '',
        MNo: '',
        MNo2: '',
        AadharNo: '',
        VIdNo: '',
        GCYear: '',

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
   



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const detailsToSend = {
                IncRefId: referenceDetails.IncRefId,
                PacketNo: referenceDetails.PacketNo,
                voterDetails,
                addressDetail
            };
            const result = await fetch('/api/v1/admin/addVoter', {
                method: 'POST',
                body: JSON.stringify(detailsToSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.ok) {
                toast.success('Voters Added Successfully.');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error(`Error in Adding Council: ${result.statusText}`);
            }
        } catch (error) {
            toast.error(`Error in Adding Council: ${error.message}`);
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





                    <Button type="submit" className="mt-4">Submit</Button>
                </Form>
            </div>
        </main>
    );
}

export default AddVoter;
