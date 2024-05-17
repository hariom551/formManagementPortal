import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Box, Button as MUIButton } from '@mui/material';
import Button from 'react-bootstrap/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import { jsPDF } from 'jspdf'; 
import autoTable from 'jspdf-autotable';
import Select from 'react-select';

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function PollingStationAllotment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const content = searchParams.get('content');

  const [PSListDetails, setPSListDetails] = useState([]);
  const [formData, setFormData] = useState({
    Id: content || '', 
    PSId: '',
    WBId: '',
    EWardBlock:'',
    TotalVoters:'0',
    PSNo:'',
    EPSName:'',
    RoomNo:'',
    VtsFrom: '',
    VtsTo: '',
  });

  const [WBOptions, setWBOptions] = useState([]);
  useEffect(() => {

    const fetchWBOptions = async () => {
      try {
        const response = await fetch('/api/v1/admin/wardBlockDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
   
        if (!response.ok) {
          throw new Error('Failed to fetch wardblock options');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid wardblock options data');
        }
        // Map data to an array of { value, label } objects
        const options = data.map(wb => ({ value: wb.Id, label: wb.EWardBlock }));
        setWBOptions(options);
        
      } catch (error) {
        console.error('Error fetching wardblock options:', error);
      }
    };

    fetchWBOptions();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/admin/pSListDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch PollingStationAllotment details');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid PollingStationAllotment details data');
        }
        setPSListDetails(data);
        if (content) {
          const PollingStationAllotment = data.find(item => item.Id == content);
     
          if (PollingStationAllotment) {
            setFormData(PollingStationAllotment);
          } else {
            console.error(`PollingStationAllotment with ID ${content} not found`);
          }
        }
      } catch (error) {
        console.error('Error fetching PollingStationAllotment data:', error);
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
        console.log("PollingStationAllotment Added Successfully.");
      } else {
        console.error("Error in Adding PollingStationAllotment:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding PollingStationAllotment:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  const handleDelete = async (Id) => {
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
        console.log("PollingStationAllotment deleted successfully.");
      } else {
        console.error("Error in deleting PollingStationAllotment:", result.statusText);
      }
    } catch (error) {
      console.error("Error in deleting PollingStationAllotment:", error.message);
    }
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });
  
  const handleExport = (rows, format) => {
    if (format === 'csv') {
      const csv = generateCsv(csvConfig)(rows.map(row => row.original));
      download(csvConfig)(csv);
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      const tableData = rows.map(row => Object.values(row.original));
      const tableHeaders = columns.map(c => c.header);
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
      doc.save('PollingStationAllotment-export.pdf');
    }
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
            <Link to={{ pathname: "/PollingStationAllotment", search: `?content=${row.original.Id}` }}>
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
      accessorKey: 'ESPArea',
      header: 'PS Area (English)',
      size: 20,
    },
    {
      accessorKey: 'HSPArea',
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
      accessorKey: 'RoomNo',
      header: 'Room No.',
      size: 20,
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: PSListDetails,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <MUIButton
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExport(table.getPrePaginationRowModel().rows, 'csv')}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data (CSV)
        </MUIButton>
        <MUIButton
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExport(table.getPrePaginationRowModel().rows, 'pdf')}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data (PDF)
        </MUIButton>
      </Box>
    ),
  });

  return (
    <main className="bg-gray-100">
      <div className="container py-4 pl-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Polling Station Allotment </h1>
        <Form onSubmit={handleSubmit} className="PollingStationAllotment-form">
          <Row className="mb-3">
          <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Select WardBlock</Form.Label>
                <Select
              id="WBSelect"
              name="WBId"
              value={WBOptions.find(option => option.value === formData.WBId)}
              onChange={option => setFormData(prevFormData => ({ ...prevFormData, WBId: option.value }))}
              options={WBOptions}
              placeholder="Select WardBlock"
            />
            </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Total Voters</Form.Label>
                <Form.Control type="text"  id="TotalVoters" name="TotalVoters" value={formData.TotalVoters} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>PS No.</Form.Label>
                <Form.Control type="text" placeholder="PS No." id="PSNo" name="PSNo" value={formData.PSNo} onChange={handleChange} required />
              </Form.Group>
            </div>
          </Row>
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>PS Name (English)</Form.Label>
                <Form.Control type="text" placeholder="PS Name (English)" id="ESPName" name="ESPName" value={formData.ESPName} onChange={handleChange} required />
              </Form.Group>
            </div>
          
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Room No.</Form.Label>
                <Form.Control type="text" placeholder="Room No." id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Voter Serial From</Form.Label>
                <Form.Control type="text" placeholder="Voter Serial From" id="VtsFrom" name="VtsFrom" value={formData.VtsFrom} onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Voter Serial To</Form.Label>
                <Form.Control type="text" placeholder="Voter Serial To" id="VtsTo" name="VtsTo" value={formData.VtsTo} onChange={handleChange} required />
              </Form.Group>
            </div>

          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr className="my-4" />
        <h4 className="container mt-3 text-xl font-bold mb-3">PollingStationAllotment List</h4>
        <div className="overflow-x-auto">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </main>
  );
}

export default PollingStationAllotment;
