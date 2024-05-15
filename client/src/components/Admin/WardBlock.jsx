import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function WardBlock() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const content = searchParams.get('content');

  const [WardBlockDetails, setWardBlockDetails] = useState([]);
  const [formData, setFormData] = useState({
    Id: content || '',
    EWardBlock: '',
    HWardBlock: '',
    WardNo: '',
    EVidhanSabha: '',
    VSId: ''

  });

  const [vsOptions, setVSOptions] = useState([]);
  useEffect(() => {

    const fetchVSOptions = async () => {
      try {
        const response = await fetch('/api/v1/admin/vidhanSabhaDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
   
        if (!response.ok) {
          throw new Error('Failed to fetch vidhanSabha options');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid vidhansabha options data');
        }
        // Map data to an array of { value, label } objects
        const options = data.map(vs => ({ value: vs.Id, label: vs.EVidhanSabha }));
        setVSOptions(options);
        
      } catch (error) {
        console.error('Error fetching vidhanSabha options:', error);
      }
    };

    fetchVSOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/admin/wardBlockDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch WardBlock details');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('Empty or invalid WardBlock details data');
        }
        setWardBlockDetails(data);
        if (content) {
          const WardBlock = data.find(item => { return item.Id == content });
          if (WardBlock) {
            setFormData(WardBlock);
          } else {
            console.error(`WardBlock with ID ${content} not found`);
          }
        }
      } catch (error) {
        console.error('Error fetching WardBlock data:', error);
      }
    };

    fetchData();
  }, [content]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await fetch("/api/v1/admin/addWardBlock", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        window.location.reload();
        console.log("WardBlock Added Successfully.");
      } else {
        console.error("Error in Adding WardBlock:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding WardBlock:", error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

   

    try {
      const result = await fetch("/api/v1/admin/updateWardBlockDetails", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {

        window.location.href = '/WardBlock';

        console.log("WardBlock Updated successfully.");
      } else {
        console.error("Error in Updating WardBlock:", result.statusText);
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
      let result = await fetch("/api/v1/Admin/deleteWardBlockDetail", {
        method: 'POST',
        body: JSON.stringify({ Id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        window.location.reload();
        console.log("WardBlock Added Successfully successfully.");
      } else {
        console.error("Error in Adding WardBlock:", result.statusText);
      }
    } catch (error) {
      console.error("Error in Adding WardBlock:", error.message);
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
            <Link
              to={{ pathname: "/WardBlock", search: `?content=${row.original.Id}` }}
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
        accessorKey: 'EVidhanSabha',
        header: 'VidhanSabha',
        size: 20,
      },
    {
        accessorKey: 'WardNo',
        header: 'Ward No',
        size: 20,
      },
    {
      accessorKey: 'EWardBlock',
      header: 'WardBlock (English)',
      size: 20,
    },


    {
      accessorKey: 'HWardBlock',
      header: 'WardBlock (Hindi)',
      size: 20,
    },
    

  ], []);

  const table = useMaterialReactTable({
    columns,
    data: WardBlockDetails,
  });

  return (
    <main className="bg-gray-100">
      <div className="container py-4 pl-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Add WardBlock</h1>
        <Form onSubmit={content ? handleEdit : handleSubmit} className="WardBlock-form">
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Select VidhanSabha</Form.Label>
                <Form.Select
                  id="VSSelect"
                  name="VSId"
                  value={formData.VSId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select VidhanSabha</option>
                  {vsOptions.map(option => (
                    <option
                      key={option.value}
                      value={option.value} 

                    >
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Ward No</Form.Label>
                <Form.Control type="text" placeholder="Ward No" id="WardNo" name="WardNo" value={formData.WardNo} onChange={handleChange} required />
              </Form.Group>
            </div>



            </Row>
            <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>WardBlock Name (English)</Form.Label>
                <Form.Control type="text" placeholder="WardBlock Name (English)" id="EWardBlock" name="EWardBlock" value={formData.EWardBlock} onChange={handleChange} required />
              </Form.Group>
            </div>


            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>WardBlock Name (Hindi)</Form.Label>
                <Form.Control type="text" placeholder="WardBlock Name (Hindi)" id="HWardBlock" name="HWardBlock" value={formData.HWardBlock} onChange={handleChange} required />
              </Form.Group>
            </div>
          </Row>

          <Button variant="primary" type="submit">
            {content ? 'Update' : 'Submit'}
          </Button>
        </Form>
        <hr className="my-4" />
        <h4 className="container mt-3 text-xl font-bold mb-3">WardBlock List</h4>
        <div className="overflow-x-auto">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </main>
  );
}

export default WardBlock;
