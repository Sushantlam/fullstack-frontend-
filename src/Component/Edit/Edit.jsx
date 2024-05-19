// EditCourse.js
import React, { useState } from 'react';
import './Edit.css';
import { ImCross } from 'react-icons/im';
import axios from 'axios';

const Edit = ({ setOpenEdit, data }) => {
  
   
  const [item, setItem] = useState({
    userName: data.userName,
    email: data.email,
    
   

  });


  const handleUser = async (e) => {
    e.preventDefault();
    const id = data.id;
  
   
  
    try {
      const response = await axios.put(`https://backend-pgtt.onrender.com/api/auth/profile/${id}`, item);
      console.log(response);
      if (response) {
        setOpenEdit(false);
        console.log('Item updated successfully');
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setItem({
        ...item,
        [id]: value,
      });
  };

 

  console.log(item);
  

  return (
    <div className="add">
      <div className="modal">
        <ImCross className="icon" color='green' onClick={() => setOpenEdit(false)} />
        <div className="flex flex-col gap-3">
          <label htmlFor="Email" className="text-black">
            Email
          </label>
          <input
            type="text"
            value={item.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your Course"
            className="p-1 border-2 rounded-md text-black"
            required
          />
          <label htmlFor="Username" className="text-black">
            Username
          </label>
          <input
            type="text"
            value={item.userName}
            onChange={handleChange}
            id="userName"
          
            className="p-1 border-2 rounded-md text-black"
            required
          />
         

        

          <button className="bg-blue-500 py-2" onClick={handleUser}>
            Update
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default Edit;
