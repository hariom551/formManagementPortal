import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Box } from '@mui/material';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
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
    const [OFDetails, setOFListDetails] = useState([]);
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

    const [suggestedMobiles, setSuggestedMobiles] = useState([]);
    const [suggestedCareOfMobiles, setSuggestedCareOfMobiles] = useState([]);

    const fetchSuggestedMobiles = async (input, setter) => {
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
            setter(data);

            console.log(suggestedCareOfMobiles);
        } catch (error) {
            console.error('Error fetching suggested mobile numbers:', error);
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
                setOFListDetails(data);
            } catch (error) {
                console.error('Error fetching OutgoingForms data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const result = await fetch("/api/v1/FormsAdmin/addOutForm", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

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
            setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    


    const handleExportData = () => {
        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: '.',
            useKeysAsHeaders: true,
        });
        const csv = generateCsv(csvConfig)(OFDetails);
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
                    <FormsAdminInfo />
                </div>

                <h1 className="text-3xl font-bold my-4">Outgoing Form Info</h1>
                <Form onSubmit={handleSubmit} className="OutgoingForms-form">
                    <Row className="mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Mobile Number<sup className='text-red-500'>*</sup></Form.Label>
                                <Typeahead
                                    id="VMob1"
                                    onInputChange={(value) => fetchSuggestedMobiles(value, setSuggestedMobiles)}
                                    onChange={(selected) => {
                                        if (selected.length > 0) {
                                            const [choice] = selected;
                                            setFormData(prevData => ({
                                                ...prevData,
                                                VMob1: choice.VMob1,
                                                VMob2: choice.VMob2,
                                                VEName: choice.VEName,
                                                VHName: choice.VHName,
                                                VEAddress: choice.VEAddress,
                                                VHAddress: choice.VHAddress,
                                            }));
                                        }
                                    }}
                                    options={suggestedMobiles}
                                    placeholder="Mobile Number"
                                    labelKey="VMob1"
                                    renderMenuItemChildren={(option) => (
                                        <div>
                                            {option.VMob1} - {option.VEName}
                                        </div>
                                    )}
                                />

                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Name (English) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (English)" id="VEName" name="VEName" value={formData.VEName} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Name (Hindi) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (Hindi)" id="VHName" name="VHName" value={formData.VHName} onChange={handleChange} />
                            </Form.Group>
                        </div>
                    </Row>

                    <Row className="mb-3">
                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Address (English)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Address (English)" id="VEAddress" name="VEAddress" value={formData.VEAddress} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Address (Hindi)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Address (Hindi)" id="VHAddress" name="VHAddress" value={formData.VHAddress} onChange={handleChange} />
                            </Form.Group>
                        </div>
                    </Row>
                    <div className="row mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Care Of Mobile<sup className='text-red-500'>*</sup></Form.Label>
                                <Typeahead
                                    id="CMob1"
                                    onInputChange={(value) => fetchSuggestedMobiles(value, setSuggestedCareOfMobiles)}
                                    onChange={(selected) => {
                                        if (selected.length > 0) {
                                            const [choice] = selected;
                                            setFormData(prevData => ({
                                                ...prevData,
                                                CMob1: choice.VMob1,
                                                CEName: choice.VEName,
                                                CHName: choice.VHName,
                                            }));
                                        }
                                    }}
                                    options={suggestedCareOfMobiles}
                                    placeholder="Mobile Number"
                                    labelKey="VMob1"
                                    renderMenuItemChildren={(option) => (
                                        <div>
                                            {option.VMob1} - {option.VEName}
                                        </div>
                                    )}
                                />

                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Careof (English)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Careof (English)" id="CEName" name="CEName" value={formData.CEName} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Careof (Hindi)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Careof (Hindi)" id="CHName" name="CHName" value={formData.CHName} onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>No. of Forms<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="number" placeholder="No. of Forms" id="NoOfForms" name="NoOfForms" value={formData.NoOfForms} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group>
                                <Form.Label>Sending Date:<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="date" placeholder="Sending Date" id="SendingDate" name="SendingDate" value={formData.SendingDate} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-9 mb-3">
                            <Form.Group>
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control type="text" placeholder="Remarks" id="ERemarks" name="ERemarks" value={formData.ERemarks} onChange={handleChange} />
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
