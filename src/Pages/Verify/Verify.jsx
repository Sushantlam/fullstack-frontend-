import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Verify = () => {
    
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Send a request to your server to verify the email with the ID
                const response = await axios.get(`https://backend-pgtt.onrender.com/api/auth/verify/${id}`);
                console.log(response.data); // Log the response from the server
                // You can handle the response according to your application's logic
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        };
    
        verifyEmail();
    }, [id]);
    
    return (
        <div>Your email is verified please go to login
             <Link to='/login'><span className='px-2 py-1 text-blue-600 rounded-lg'>Go to Login</span></Link>
        </div>
    );
}

export default Verify;
