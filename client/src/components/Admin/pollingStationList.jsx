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

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function PollingStationList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const content = searchParams.get('content');

  const [PSListDetails, setPSListDetails] = useState([]);
  const [formData, setFormData] = useState({
    Id: content || '', 
    DId: '',
    ESPArea: '',
    HSPArea: '',
    PSNo: '',
    ESPName: '',
    HSPName: '',
    RoomNo: ''
  });

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
          throw new Error('Failed to fetch PollingStationList details');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid PollingStationList details data');
        }
        setPSListDetails(data);
        if (content) {
          const PollingStationList = data.find(item => item.Id == content);
     
          if (PollingStationList) {
            setFormData(PollingStationList);
          } else {
            console.error(`PollingStationList with ID ${content} not found`);
          }
        }
      } catch (error) {
        console.error('Error fetching PollingStationList data:', error);
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
        console.log("PollingStationList Added Successfully.");
      } else {
        console.error("Error in Adding PollingStationList:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding PollingStationList:", error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/v1/admin/updatePSListDetail", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        window.location.href = '/PollingStationList';
        console.log("PollingStationList Updated successfully.");
      } else {
        console.error("Error in Updating PollingStationList:", result.statusText);
      }
    } catch (error) {
      console.error("Error in updating :", error.message);
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
        console.log("PollingStationList deleted successfully.");
      } else {
        console.error("Error in deleting PollingStationList:", result.statusText);
      }
    } catch (error) {
      console.error("Error in deleting PollingStationList:", error.message);
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
      doc.save('PollingStationList-export.pdf');
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
            <Link to={{ pathname: "/PollingStationList", search: `?content=${row.original.Id}` }}>
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
        <h1 className="text-2xl font-bold mb-4">Add Polling Station</h1>
        <Form onSubmit={content ? handleEdit : handleSubmit} className="PollingStationList-form">
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>PS Area (English)</Form.Label>
                <Form.Control type="text" placeholder="PS Area (English)" id="ESPArea" name="ESPArea" value={formData.ESPArea} onChange={handleChange} required />
              </Form.Group>
            </div>
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>PS Area (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="PS Area (Hindi)" id="HSPArea" name="HSPArea" value={formData.HSPArea} onChange={handleChange} required />
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
                <Form.Label>PS Name (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="PS Name (Hindi)" id="HSPName" name="HSPName" value={formData.HSPName} onChange={handleChange} required />
              </Form.Group>
            </div>
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Room No.</Form.Label>
                <Form.Control type="text" placeholder="Room No." id="RoomNo" name="RoomNo" value={formData.RoomNo} onChange={handleChange} required />
              </Form.Group>
            </div>
          </Row>
          <Button variant="primary" type="submit">
            {content ? 'Update' : 'Submit'}
          </Button>
        </Form>
        <hr className="my-4" />
        <h4 className="container mt-3 text-xl font-bold mb-3">PollingStationList List</h4>
        <div className="overflow-x-auto">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </main>
  );
}

export default PollingStationList;
