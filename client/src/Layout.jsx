import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Pages/Header.jsx';
import Spinner from './components/Pages/Spinner.jsx';

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await localStorage.getItem('token');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };
  
    checkToken();
  }, []);

  if (isLoading) {
    // Optionally, you can render a loading spinner or message here
     
    return <Spinner />
  }

  return isLoggedIn ? (
    <>
      <Header />
      <Outlet />
    </>
  ) :null;
}

export default Layout;
