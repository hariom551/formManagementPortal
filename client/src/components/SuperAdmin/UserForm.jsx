import React, { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'

function UserForm() {
  const [userData, setUserData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const content = searchParams.get('content');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['userId', 'password', 'confirmPassword', 'name', 'mobile1', 'role'];
    const isEmpty = requiredFields.some(field => !document.getElementById(field).value.trim());

    if (isEmpty) {
      // Display toast notification for empty required fields
      toast.error('Please fill in all required fields.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const name = document.getElementById("name").value;
    const mobile1 = document.getElementById("mobile1").value;
    const mobile2 = document.getElementById("mobile2").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const permission = document.getElementById("permission").value;
    const role = document.getElementById("role").value;


    const requestBody = {
      userId,
      password,
      confirmPassword,
      name,
      mobile1,
      mobile2,
      email,
      address,
      permission,
      role
    };

    try {
      let result = await fetch("http://localhost:3000/api/v1/users/submitdetails", {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        // navigate('/userForm');
        // window.location.href = '/userForm';
      
        toast.success('Form submitted successfully.');
        setTimeout(() => {
          window.location.reload()
        }, 2000);

      } else {
        toast.error("Error submitting form:", result.statusText);
      }
    } catch (error) {
      toast.error("Error submitting form:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/hariom', {
          method: 'POST',
          body: JSON.stringify({ role: content }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        toast.error('Error fetching user data:', error);
      }
    };



    fetchData();


  }, [content]);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'Serial No',
        header: 'S.No',
        size: 50,

        Cell: ({ row }) => row.index + 1
      },
      {
        accessorKey: 'userid',
        header: 'UserID',
        size: 20,
      },
      {
        accessorKey: 'password',
        header: 'Password',
        size: 20,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 50,
      },
      {
        accessorKey: 'mobile1',
        header: 'Mobile1',
        size: 10,
      },
      {
        accessorKey: 'mobile2',
        header: 'Mobile2',
        size: 10,
      },
      {
        accessorKey: 'email',
        header: 'E-Mail Id',
        size: 50,
      },
      {
        accessorKey: 'address',
        header: 'address',
        size: 150,
      },
      {
        accessorKey: 'permissionaccess',
        header: 'Permission',
        size: 50,
      },
      {
        accessorKey: 'role',
        header: 'role',
        size: 50,
      },




      {
        accessorKey: 'changePassword',
        header: 'Change Password',
        size: 150,
        Cell: ({ row }) => (
          <Button variant="primary" className="changepassword">
            <Link
              to={{ pathname: "/changePassword", search: `?content=${row.original.userid}` }} // Navigate to changePassword page with user ID
            >
              Change Password
            </Link>
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: userData,
  });

  function validatePassword(e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  }

  return (

    <main className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto py-8 text-black">

        <div className=' flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-4">Add {content}</h1>
          <p className='text-sm font-serif'><sup>*</sup>fields are required</p>
        </div>
        <Form onSubmit={handleSubmit} className="user-form">
          <h1 className='text-lg font-bold mb-3'>Login Credentials</h1>
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>userId <sup className='text-red-600'>*</sup></Form.Label>
                <Form.Control type="text" placeholder="Enter userId" id="userId" name="userId" required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Password<sup className='text-red-600'>*</sup></Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" name="password" required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Confirm Password<sup className='text-red-600'>*</sup></Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" required />
              </Form.Group>
            </div>
          </Row>

          <hr />

          <h3 className='text-lg font-bold mt-3 mb-3'>User Information</h3>
          <Row className="mb-3">
            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Name<sup className='text-red-600'>*</sup></Form.Label>
                <Form.Control type="text" placeholder="Enter Name" id="name" name="name" required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Mobile Number 1<sup className='text-red-600'>*</sup></Form.Label>
                <Form.Control type="tel" placeholder="Mobile Number 1" id="mobile1" name="mobile1" required />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Mobile Number 2</Form.Label>
                <Form.Control type="tel" placeholder="Mobile Number 2" id="mobile2" name="mobile2" />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="Enter Email Id" id="email" name="email" />
              </Form.Group>
            </div>

            <div className="col-md-5 mb-3">
              <Form.Group >
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" id="address" name="address" />
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group >
                <Form.Label>Permission:</Form.Label>
                <Form.Select name="permission" id="permission" >
                  <option value="" disabled>Select Access</option>
                  <option value="read">Read</option>
                  <option value="write">Write</option>
                  <option value="execute">Execute</option>
                </Form.Select>
              </Form.Group>
            </div>

            <input type="hidden" id="role" name="role" value={content} />
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <hr className="my-4" />
        <h4 className="container mt-3 text-xl font-bold mb-2">{content} Detail </h4>
        <div className="overflow-x-auto">



          <MaterialReactTable table={table} />;


        </div>
      </div>
    </main>

  );
};

export default UserForm;
{/* <table className="table table-hover w-full ">
            
            <thead>
              <tr>
                <th className="px-4 py-2">SNO.</th>
                <th className="px-4 py-2">User Id</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Mobile No.1</th>
                <th className="px-4 py-2">Mobile No.2</th>
                <th className="px-4 py-2">Email Id</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Permission</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Change Password</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.userid}</td>
                  <td className="border px-4 py-2">{user.password}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.mobile1}</td>
                  <td className="border px-4 py-2">{user.mobile2}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">{user.permissionaccess}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                   
                    <Button variant="primary" className="changepassword">
                      <Link to={{ pathname: "/changePassword", search: `?content=${user.userid}` }}>
                        Change Password
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}




