import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
    const { component}= props;
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        ;(async ()=>{
        try{
            const response = await axios.post(
                "",
                null,
                {
                    withCredentials: true 
                }
            );
            console.log(response.data.statusCode);
            if (response.data.statusCode===200)
            {
                setIsAuthenticated(true);
            }

        }catch(erroe){
            navigate("/login");
        }
    })();
},[navigate]);


    return <component/>
}

export default ProtectedRoute