import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from './LoginImage.jpg'; // Import background image

function Login() {
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval); // Clean up interval
  }, []);

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    setDate(dateString);
    setTime(`${hours}:${minutes}:${seconds}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/api/v1/users/login", {
        method: 'post',
        body: JSON.stringify({ userid: userId, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await result.json();

      if (result.status === 200) {
        const { user, token } = data.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        window.location.href = '/home';
        
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Login request failed:', error);
      toast.error('Invalid user credentials. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
        <header className="flex justify-between items-center px-6 py-10">
          <span className="text-lg">Login Page</span><br />
          <div className="text-right text-white">
            <span className="text-lg">{date}</span><br />
            <span className="text-lg">{time}</span>
          </div>
        </header>

        <div className="flex justify-center items-center h-screen  font-serief">
          <Form onSubmit={handleSubmit} className="loginbox max-w-3xl mt-2 mx-auto p-4 rounded-lg shadow-md">
            {/* <h1 className="Login w-1000 flex justify-center items-center bg-blue-600 text-white mb-3 text-xl py-2">Login</h1> */}
            <Form.Group className="mb-3 pt-4" >
              <Form.Label>User Id:</Form.Label>
              <Form.Control 
                type= "text" 
                id="userid"
                name="userid"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                placeholder="Enter User Id" 
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="Password"
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
              Login
            </Button>
          </Form>
        </div>
        <ToastContainer /> 
      </div>
    </>
  );
}

export default Login;
