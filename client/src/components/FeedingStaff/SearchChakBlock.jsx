import React, { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchChakBlock() {
    const [perseemanDetails, setPerseemanDetails] = useState([]);
    const [formData, setFormData] = useState({
        ChakNo: '',
        ECBPanch: '',
        EAreaVill: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/feedingstaff/getPerseemanDetails", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Empty or invalid details data');
            }

            setPerseemanDetails(data);
        } catch (error) {
            toast.error(`Error in fetching data: ${error.message}`);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const columns = useMemo(() => [
        {
            accessor: (index) => index + 1,
            id: 'serialNumber',
            Header: 'S.No',
            size: 5,
            Cell: ({ cell }) => cell.row.index + 1
        },
        {
            accessorKey: 'ChakNo',
            header: 'ChakNo',
            size: 20,
        },
        {
            accessorKey: 'ECBPanch',
            header: 'Block',
            size: 20,
        },
        {
            accessorKey: 'EAreaVill',
            header: 'Area',
            size: 20,
       
        },
        {
            accessorKey: 'WardNo',
            header: 'WardNo',
            size: 20,
       
        }


    ], []);

    const table = useMaterialReactTable({
        columns,
        data: perseemanDetails,
    });

    return (
        <main className="bg-gray-100">
            <ToastContainer />
            <div className="container py-4 pl-6 text-black">
                <h1 className="text-2xl font-bold mb-4">Search Details</h1>
                <Form onSubmit={handleSubmit} className="SearchCB-form">
                    <Row className="mb-3">
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>ChakNo</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter ChakNo"
                                    id="ChakNo"
                                    name="ChakNo"
                                    value={formData.ChakNo} onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Block</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Block"
                                    id="ECBPanch"
                                    name="ECBPanch" value={formData.ECBPanch} onChange={handleChange} />
                            </Form.Group>
                        </div>

                        <div className="col-md-3 mb-3">
                            <Form.Group >
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="text" placeholder="Enter Area" id="EAreaVill"
                                    name="EAreaVill" value={formData.EAreaVill} onChange={handleChange} />

                            </Form.Group>
                        </div>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <hr className="my-4" />
                <h4 className="container mt-3 text-xl font-bold mb-3"> List</h4>
                <div className="overflow-x-auto">
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </main>
    );
}

export default SearchChakBlock;
