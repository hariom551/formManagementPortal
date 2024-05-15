import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Box } from '@mui/material';
import Button from 'react-bootstrap/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function IncomingForms() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const content = searchParams.get('content');

  const [PSListDetails, setPSListDetails] = useState([]);
  const [formData, setFormData] = useState({
    Id: content || '', 
    DId: '',
    EPSArea: '',
    HSPArea:'',
    PSNo: '',
    ESPName: '',
    HSPName: '',
    RoomNo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/admin/tehsilDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch IncomingForms details');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid IncomingForms details data');
        }
        setPSListDetails(data);
        if (content) {
          const IncomingForms = data.find(item =>{  return item.Id == content});
     
          if (IncomingForms) {
            setFormData(IncomingForms);
           
          } else {
            console.error(`IncomingForms with ID ${content} not found`);
          }
        }
      } catch (error) {
        console.error('Error fetching IncomingForms data:', error);
      }
    };
  
    fetchData();
  }, [content]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/v1/admin/addPSList", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        window.location.reload();
        console.log("IncomingForms Added Successfully.");
      } else {
        console.error("Error in Adding IncomingForms:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding IncomingForms:", error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // const Id = content;
    // const EName = document.getElementById("EName").value;
    // const HName = document.getElementById("HName").value;


    // const requestBody = {
    //   Id,
    //   EName,
    //   HName,
    // };
    // console.log(requestBody);

    try {
      const result = await fetch("/api/v1/admin/updatePSListDetail", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {

        window.location.href = '/IncomingForms';

        console.log("IncomingForms Updated successfully.");
      } else {
        console.error("Error in Updating IncomingForms:", result.statusText);
      }
    } catch (error) {
      console.error("Error in updating :", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (Id) =>{
  

    try {
      let result = await fetch("/api/v1/Admin/deletePSListDetail", {
        method: 'POST',
        body: JSON.stringify({Id}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        window.location.reload();
        console.log("IncomingForms Added Successfully successfully.");
      } else {
        console.error("Error in Adding IncomingForms:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding IncomingForms:", error.message);
    }
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });
  
  const handleExportData = () => {
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
      accessorKey: 'Action',
      header: 'Action',
      size: 10,
      Cell: ({ row }) => (
        <>
        

            <Button variant="primary" className="changepassword">
            <Link
              to={{ pathname: "/IncomingForms", search: `?content=${row.original.Id}` }}
            >
              Edit
            </Link>
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.original.Id)} className="delete" type='button'>

            Delete

          </Button>




      </>
      ),
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
    data: PSListDetails,
  });

  return (
    <main className="bg-gray-100">
      <div className="container py-4 pl-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Incomimg Form Info</h1>
        <Form onSubmit={content ? handleEdit : handleSubmit} className="IncomingForms-form">
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Mobile No. 1</Form.Label>
                <Form.Control type="tel" placeholder="Mobile No. 1" id="EPSArea" name="EPSArea" value={formData.EPSArea} onChange={handleChange} required />
              </Form.Group>
            </div>
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Mobile No. 2</Form.Label>
                <Form.Control type="tel" placeholder="Mobile No. 2" id="HSPArea" name="HSPArea" value={formData.HSPArea} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Name (English)</Form.Label>
                <Form.Control type="text" placeholder="Name (English)" id="PSNo" name="PSNo" value={formData.PSNo} onChange={handleChange} required />
              </Form.Group>
            </div>
            </Row>

            <Row className="mb-3">
           

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Name (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="Name (Hindi)" id="ESPName" name="ESPName" value={formData.ESPName} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Address (English)</Form.Label>
                <Form.Control type="text" placeholder="Address (English)" id="HSPName" name="HSPName" value={formData.HSPName} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Address (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="Address (Hindi)" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Address (English)</Form.Label>
                <Form.Control type="text" placeholder="Address (English)" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Care of Mobile No.</Form.Label>
                <Form.Control type="text" placeholder="Care of Mobile No." id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

          
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Care of (English)</Form.Label>
                <Form.Control type="text" placeholder="Care of (English)" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Care of (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="Care of (Hindi)" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>No. of Forms</Form.Label>
                <Form.Control type="text" placeholder="No. of Forms" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Remarks</Form.Label>
                <Form.Control type="text" placeholder="Remarks" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>
              
            
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Sending Date</Form.Label>
                <Form.Control type="date" placeholder="Sending Date" id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            </Row>
          
            <Button variant="primary" type="submit">
            {content ? 'Update' : 'Submit'}
          </Button>

        </Form>
        <hr className="my-4" />
        <h4 className="container mt-3 text-xl font-bold mb-3">IncomingForms List</h4>
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
export default IncomingForms;