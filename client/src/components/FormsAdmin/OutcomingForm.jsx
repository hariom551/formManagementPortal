import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';

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
        SendingDate: '',
        ERemarks: '',
        COList: [], 
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/FFormsAdmin/OutgoingFormsDetails', {
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
            const result = await fetch("/api/v1/admin/addOutgoingForms", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
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

    const columns = useMemo(() => [
        {
            accessorKey: 'Id',
            header: 'S.No',
            size: 10,
        },
        {
            accessorKey: 'EPSArea',
            header: 'PS Area (English)',
            size: 20,
        },
        {
            accessorKey: 'HPSArea',
            header: 'PS Area (Hindi)',
            size: 20,
        },
        {
            accessorKey: 'PSNo',
            header: 'PS No.',
            size: 20,
        },
        {
            accessorKey: 'ESPName',
            header: 'PS Name(English)',
            size: 20,
        },
        {
            accessorKey: 'HSPName',
            header: 'PS Name (Hindi)',
            size: 20,
        },
        {
            accessorKey: 'RoomNo.',
            header: 'Room No.',
            size: 20,
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: OFDetails,
    });

    const handleAddCareOf = () => {
        setFormData({
            ...formData,
            COList: [...formData.COList, { VMob1: '', VEName: '', VHName: '' }]
        });
    };

    const handleCareOfChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCOList = [...formData.COList];
        updatedCOList[index][name] = value;
        setFormData({ ...formData, COList: updatedCOList });
    };

    return (
        <main className="bg-gray-100">
            <div className="container py-4 pl-6 text-black">
                <div className='w-full h-full my-1 container-fluid'>
                    <div className="gap-4 lg:flex">

                        <div className='gap-4 sm:flex my-2'>
                            <div className='h-24 lg:w-[20vw] w-full bg-sky-600 flex my-1 box1 hover:bg-sky-700  hover:transition-transform hover:transform-gpu'>
                                <div className='h-full w-36 bg-sky-800 flex items-center justify-center'>
                                    <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                                </div>
                                <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                                    <p>TOTAL OUTGOING</p>
                                    <span className='text-2xl'>15236</span>
                                </div>
                            </div>


                            {/* First box total Incoming  */}
                            <div className='h-24  lg:w-[20vw] w-full bg-red-500 flex my-1 box hover:bg-red-600 hover:transition-transform hover:transform-gpu'>
                                <div className='h-full w-36 bg-red-700 flex items-center justify-center'>
                                    <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                                </div>
                                <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                                    <p>TOTAL INCOMING</p>
                                    <span className='text-2xl'>984436</span>
                                </div>
                            </div>
                        </div>

                        <div className='gap-4 sm:flex my-2'>
                            {/* First box ref outGoing  */}
                            <div className='h-24  lg:w-[20vw] w-full bg-yellow-600 flex my-1 box hover:bg-yellow-500 hover:transition-transform hover:transform-gpu' >
                                <div className='h-full w-36 bg-yellow-700 flex items-center justify-center'>
                                    <FaUserPlus className='text-5xl text-white' />
                                </div>
                                <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                                    <p>TOTAL OUTGOING</p>
                                    <span className='text-2xl'><pre>    </pre></span>
                                </div>
                            </div>
                            {/* First box ref €incoming  */}
                            <div className='h-24  lg:w-[20vw] w-full bg-green-500 flex my-1 box hover:bg-green-600 hover:transition-transform hover:transform-gpu'>
                                <div className='h-full w-36 bg-green-700 flex items-center justify-center'>
                                    <MdOutlinePlaylistAddCheck className='text-6xl text-white' />
                                </div>
                                <div className='h-24 w-full flex items-start justify-center text-white flex-col px-3'>
                                    <p>REF. INCOMING</p>
                                    <span className='text-2xl'><pre>    </pre></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="text-3xl font-bold my-4">Outgoing Form Info</h1>
                <Form onSubmit={handleSubmit} className="OutgoingForms-form">
                    <Row className="mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Mobile No. 1 <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="tel" placeholder="Mobile No. 1" id="VMob1" name="VMob1" value={formData.VMob1} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Mobile No. 2</Form.Label>
                                <Form.Control type="tel" placeholder="Mobile No. 2" id="VMob2" name="VMob2" value={formData.VMob2} onChange={handleChange} />
                            </Form.Group>
                        </div>

                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Name (English) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (English)" id="VEName" name="VEName" value={formData.VEName} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Name (Hindi) <sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Name (Hindi)" id="VHName" name="VHName" value={formData.VHName} onChange={handleChange} required />
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
                                <Form.Control type="text" placeholder="Address (Hindi)" id="VHAddress" name="VHAddress" value={formData.VHAddress} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </Row>
                    <div className="row  mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>No. of Forms (Kanpur)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="No. of Forms" id="NoOfFormsKN" name="NoOfFormsKN" value={formData.NoOfFormsKN} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>No. of Forms (Dehat)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="No. of Forms" id="NoOfFormsKD" name="NoOfFormsKD" value={formData.NoOfFormsKD} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>No. of Forms (Unnao)<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="No. of Forms" id="NoOfFormsU" name="NoOfFormsU" value={formData.NoOfFormsU} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Packet No.<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Packet No." id="PacketNo" name="PacketNo" value={formData.RoomNo} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row  mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Recieved Date :<sup className='text-red-500'>*</sup></Form.Label>
                                <Form.Control type="date" placeholder="Recieved date" id="ReceivedDate" name="ReceivedDate" value={formData.ReceivedDate} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <div className="col-md-9 mb-3">
                            <Form.Group >
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control type="text" placeholder="Remarks" id="ERemarks" name="ERemarks" value={formData.ERemarks} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                    </div>


                    {
                        formData.COList.map((e, i) => {
                            return (
                                <div className="row  mb-3" key={i}>
                                    <div className="col-md-3 mb-3">
                                        <Form.Group >
                                            <Form.Label>Care of Mobile No.1</Form.Label>
                                            <Form.Control type="text" placeholder={`Care of Mobile No.1`} id={`VMob1_${i}`} name={`VMob1_${i}`} value={e.VMob1} onChange={(event) => handleCareOfChange(event, i)} required />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Form.Group >
                                            <Form.Label>Care of Name1 (English)</Form.Label>
                                            <Form.Control type="text" placeholder={`Care of (English)1`} id={`VEName_${i}`} name={`VEName_${i}`} value={e.VEName} onChange={(event) => handleCareOfChange(event, i)} required />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <Form.Group >
                                            <Form.Label>Care of Name1 (Hindi)</Form.Label>
                                            <Form.Control type="text" placeholder={`Care of (Hindi)1`} id={`VHName_${i}`} name={`VHName_${i}`} value={e.VHName} onChange={(event) => handleCareOfChange(event, i)} required />
                                        </Form.Group>
                                    </div>
                                    {i === 0 && (
                                        <div className='col-md-3 flex items-center justify-center'>
                                            <div className='flex items-center justify-center gap-3 checkboxColor'>
                                                <input type="checkbox" className='w-6 h-6' onClick={handleAddCareOf} />
                                                <p>Add CareOff</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    }




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
