// EditCourse.js
import React, { useState } from 'react';
import './Delete.css';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Delete = ({ setOpenDelete, data }) => {
  
   
  const [item, setItem] = useState({
    userName: data.userName,
    email: data.email,
    
   

  });

  const navigate = useNavigate();
  const handleUser = async (e) => {
    e.preventDefault();
    const id = data.id;
  
   
  
    try {
      const response = await axios.delete(`https://backend-pgtt.onrender.com/api/auth/profile/${id}`);
      console.log(response);
      if (response) {
        navigate('/login')
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



 

  console.log(item);
  

  return (
    <div className="add">
      <div className="modal">
        <ImCross className="icon" onClick={() => setOpenDelete(false)} />
        <div>
           <span className=' text-black'>Are you sure you want to delete?</span> 
            <div className='  flex justify-between w-[100%] gap-3 py-5'>
                <button onClick={handleUser} className='bg-red-600 w-[50%] rounded-lg p-3 cursor-pointer hover:bg-white hover:text-black'>Yes</button>
                <button onClick={() => setOpenDelete(false)} className='bg-blue-600 w-[50%] rounded cursor-pointer hover:bg-white hover:text-black'>No</button>
            </div>
        </div>
      </div>
    </div>
   
  );
};

export default Delete;
