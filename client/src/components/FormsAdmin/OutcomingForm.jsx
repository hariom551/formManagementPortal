import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import FormsAdminInfo from './FormsAdminInfo';

const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return [year, month, day].join('-');
};

const today = formatDate(new Date());

function OutgoingForms() {
    const [OFDetails, setPSListDetails] = useState([]);
    const [formData, setFormData] = useState({
        VMob1: '',
        VMob2: '',
        VEName: '',
        VHName: '',
        VEAddress: '',
        VHAddress: '',
        NoOfForms: '',
        SendingDate: today,
        ERemarks: '',
        CMob1: '',
        CEName: '',
        CHName: '',
    });

    const mobileInputRef = useRef(null);
    const careOfMobileInputRef = useRef(null);
    const [suggestedMobiles, setSuggestedMobiles] = useState([]);
    const [suggestedCareOfMobiles, setSuggestedCareOfMobiles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedCareOfIndex, setSelectedCareOfIndex] = useState(-1);



    const fetchSuggestedMobiles = async (input) => {
        try {
            const response = await fetch('/api/v1/formsAdmin/searchVMobNo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: input })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch suggested mobile numbers');
            }

            const data = await response.json();
            setSuggestedMobiles(data);
            setSelectedIndex(-1);

        } catch (error) {
            console.error('Error fetching suggested mobile numbers:', error);
        }
    };

    const fetchSuggestedCareOfMobiles = async (input) => {
        try {
            const response = await fetch('/api/v1/formsAdmin/searchVMobNo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: input })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch suggested mobile numbers');
            }

            const data = await response.json();
            setSuggestedCareOfMobiles(data);
            setSelectedCareOfIndex(-1);
        } catch (error) {
            console.error('Error fetching suggested mobile numbers:', error);
        }
    };



    const handleMobileNumberChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, VMob1: value });
        fetchSuggestedMobiles(value);
    };

    const handleCareOfMobileNumberChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, CMob1: value });
        fetchSuggestedCareOfMobiles(value);
    };


    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestedMobiles.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if ((e.key === 'Enter' || e.key === 'Tab') && selectedIndex >= 0) {
            e.preventDefault();
            handleMobileNumberSelect(suggestedMobiles[selectedIndex].VMob1);
        }
    };

    const handleCareOfKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedCareOfIndex((prevIndex) => Math.min(prevIndex + 1, suggestedCareOfMobiles.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedCareOfIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if ((e.key === 'Enter' || e.key === 'Tab') && selectedCareOfIndex >= 0) {
            e.preventDefault();
            handleCareOfMobileNumberSelect(suggestedCareOfMobiles[selectedCareOfIndex].VMob1);
        }
    };


    const handleMobileNumberSelect = (mobile) => {
        const selectedMobile = suggestedMobiles.find((user) => user.VMob1 === mobile);
        if (selectedMobile) {
            setFormData({
                ...formData,
                VMob1: selectedMobile.VMob1,
                VMob2: selectedMobile.VMob2,
                VEName: selectedMobile.VEName,
                VHName: selectedMobile.VHName,
                VEAddress: selectedMobile.VEAddress,
                VHAddress: selectedMobile.VHAddress
            });
            setSuggestedMobiles([]);
            setSelectedIndex(-1);
        }
    };

    const handleCareOfMobileNumberSelect = (mobile) => {
        const selectedCareOfMobile = suggestedCareOfMobiles.find((user) => user.VMob1 === mobile);
        if (selectedCareOfMobile) {
            setFormData({
                ...formData,
                CMob1: selectedCareOfMobile.VMob1,
                CEName: selectedCareOfMobile.VEName,
                CHName: selectedCareOfMobile.VHName
            });
            setSuggestedCareOfMobiles([]);
            setSelectedCareOfIndex(-1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/FormsAdmin/outFormDetails', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch OutgoingForms details');
                }
                const data = await response.json();
                if (!data || !Array.isArray(data) || data.length === 0) {
                    throw new Error('Empty or invalid OutgoingForms details data');
                }
                setPSListDetails(data);
            } catch (error) {
                console.error('Error fetching OutgoingForms data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch("/api/v1/FormsAdmin/addOutForm", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = result.json()
            console.log(data)

            if (result.ok) {
                window.location.reload();
                console.log("OutgoingForms Added Successfully.");
            } else {
                console.error("Error in Adding OutgoingForms:", result.statusText);
            }
        } catch (error) {
            console.error("Error in Adding OutgoingForms:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleExportData = () => {
        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: '.',
            useKeysAsHeaders: true,
        });
        const csv = generateCsv(csvConfig)(PSListDetails);
        download(csvConfig)(csv);
    };



    const calculateColumnTotals = (key) => {
        return OFDetails.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
    };

    const columns = useMemo(() => [
        {
            accessor: (index) => index + 1,
            id: 'serialNumber',
            Header: 'S.No',
            size: 5,
            Cell: ({ cell }) => cell.row.index + 1,
            Footer: "Total"
        },
        {
            accessorKey: 'RName',
            header: 'Name ',
            size: 15,
        },
        {
            accessorKey: 'RMob1',
            header: 'Mobile',
            size: 10,
        },
        {
            accessorKey: 'RAddress',
            header: 'Address',
            size: 20,
        },
        {
            accessorKey: 'NoOfForms',
            header: 'No Of Forms',
            size: 4,
            Footer: () => calculateColumnTotals('NoOfForms')
        },

        {
            accessorKey: 'C1Name',
            header: 'CO1 Name ',
            size: 15,
        },
        {
            accessorKey: 'C1Mob',
            header: 'CO1 Mobile',
            size: 10,
        },

        {
            accessorKey: 'SendingDate',
            header: 'Sending Date',
            size: 8,
        },
        {
            accessorKey: 'ERemark',
            header: 'Remarks',
            size: 25,
        },
    ], [OFDetails]);

    const table = useMaterialReactTable({
        columns,
        data: OFDetails,
    });





    return (
        <main className="bg-gray-100">
            <div className="container py-4 pl-6 text-black">
                <div className='w-full h-full my-1 container-fluid'>
                    <FormsAdminInfo/>
                </div>


                <h1 className="text-3xl font-bold my-4">Outgoing Form Info</h1>
                <Form onSubmit={handleSubmit} className="OutgoingForms-form">
                    <Row className="mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group controlId="VMob1">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="VMob1"
                                    placeholder="Mobile Number"
                                    value={formData.VMob1}
                                    onChange={handleMobileNumberChange}
                                    onKeyDown={handleKeyDown}
                                    ref={mobileInputRef}
                                    className="border p-2 rounded-md w-full"
                                />
                                {suggestedMobiles.length > 0 && (
                                    <ul className="suggestions max-h-48 overflow-y-auto border border-gray-300 rounded-md mt-2">
                                        {suggestedMobiles.map((mobile, index) => (
                                            <li
                                                key={mobile.VMob1}
                                                className={`p-2 cursor-pointer hover:bg-gray-400 ${index === selectedIndex ? 'bg-gray-400' : ''}`}
                                                onClick={() => handleMobileNumberSelect(mobile.VMob1)}
                                            >
                                                {mobile.VMob1} - {mobile.VEName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Form.Group>
                        </div>
                        {/* <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Mobile No. 2</Form.Label>
                                <Form.Control type="tel" placeholder="Mobile No. 2" id="VMob2" name="VMob2" value={formData.VMob2} onChange={handleChange} />
                            </Form.Group>
                        </div> */}

                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Name (English) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (English)" id="VEName" name="VEName" value={formData.VEName} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Name (Hindi) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (Hindi)" id="VHName" name="VHName" value={formData.VHName} onChange={handleChange}  />
                            </Form.Group>
                        </div>
                    </Row>

                    <Row className="mb-3">
                        <div className="col-md-6 mb-3">
                            <Form.Group >
                                <Form.Label>Address (English)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Address (English)" id="VEAddress" name="VEAddress" value={formData.VEAddress} onChange={handleChange} required />
                            </Form.Group>
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Group >
                                <Form.Label>Address (Hindi)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Address (Hindi)" id="VHAddress" name="VHAddress" value={formData.VHAddress} onChange={handleChange}  />
                            </Form.Group>
                        </div>
                    </Row>
                    <div className="row  mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group controlId="CMob1">
                                <Form.Label>Careof Mobile No.<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Careof Mobile No."
                                    name="CMob1"
                                    value={formData.CMob1}
                                    onChange={handleCareOfMobileNumberChange}
                                    onKeyDown={handleCareOfKeyDown}
                                    ref={careOfMobileInputRef}
                                    className="border p-2 rounded-md w-full"
                                    required
                                />
                                {suggestedCareOfMobiles.length > 0 && (
                                    <ul className="suggestions max-h-48 overflow-y-auto border border-gray-300 rounded-md mt-2">
                                        {suggestedCareOfMobiles.map((mobile, index) => (
                                            <li
                                                key={mobile.VMob1}
                                                className={`p-2 cursor-pointer hover:bg-gray-400 ${index === selectedCareOfIndex ? 'bg-gray-400' : ''}`}
                                                onClick={() => handleCareOfMobileNumberSelect(mobile.VMob1)}
                                            >
                                                {mobile.VMob1} - {mobile.VEName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Form.Group>
                        </div>



                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>
                                    Careof (English)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Careof (English)" id="NoOfFormsKD" name="CEName" value={formData.CEName} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>
                                    Careof (Hindi)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Careof (Hindi)" id="NoOfFormsU" name="CHName" value={formData.CHName} onChange={handleChange}  />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>
                                    No. of Forms<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="number" placeholder="No. of Forms" id="PacketNo" name="NoOfForms" value={formData.NoOfForms} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row  mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Sending Date :<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="date" placeholder="Recieved date" id="ReceivedDate" name="SendingDate" value={formData.SendingDate} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-9 mb-3">
                            <Form.Group >
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control type="text" placeholder="Remarks" id="ERemarks" name="ERemarks" value={formData.ERemarks} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>







                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>


                <hr className="my-4" />
                <h4 className="container mt-3 text-xl font-bold mb-3">OutgoingForms List</h4>
                <div className="overflow-x-auto">
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '16px',
                            padding: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            onClick={handleExportData}
                            startIcon={<FileDownloadIcon />}
                        >
                            Export Data
                        </Button>
                    </Box>

                    <MaterialReactTable table={table} />
                </div>
            </div>
        </main>
    );
}

export default OutgoingForms;
