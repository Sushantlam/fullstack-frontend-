import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import axios from 'axios';
import Edit from '../../Component/Edit/Edit';
import Delete from '../../Component/Delete/Delete';
import Nav from '../../Component/Navbar/Navbar';
import { DarkContext } from '../../Context/Button';
import { Navigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const { token, id, dispatchAuth, error } = useContext(AuthContext);
 
  const [profile, setProfile] = useState({
    email: '',
    userName: '',
    images: '',
    id:'',
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const {  state, dispatch } = useContext(DarkContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleClick = async () => {
    try {
      const res = await axios.get(`https://backend-pgtt.onrender.com/api/auth/profile/${id}`);
     console.log(res);

      setProfile({
        email: res?.data.data.email,
        userName: res?.data.data.userName,
        images: res?.data.data.images?.url,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setSelectedProfile(item); // Set selected item for editing
    setOpenEdit(true); // Open the EditCourse component
  };

  const handleDelete = (item) => {
    setSelectedDelete(item); // Set selected item for editing
    setOpenDelete(true); // Open the EditCourse component
  };

  useEffect(() => {
    handleClick();
    // Add id as a dependency if it's used inside handleClick and might change
  }, []);

  return (
    <>

    {token ? (<div className="px-4 min-h-[100vh] bg-dark-bg py-2" id={state.theme}>
      <Nav/>
      <div className=' pt-3 flex justify-center items-center  w-full' >
        <div className=' min-w-[600px] flex flex-col justify-between gap-5 items-center  '>

        
        <div className=' h-[250px] w-[250px]'>

       
      {profile.images && <img src={profile.images} className=' h-[100%] w-[100%] rounded-full' alt="User avatar" />}
      </div>
      <div>

     
<p>Email: {profile.email}</p>
<p>Username: {profile.userName}</p>
</div>
{/* You can render images if available */}

<div className=' flex gap-5'>
<button className=' bg-blue-600 p-2 rounded-lg' onClick={() => handleEdit(profile)} >Update</button>
<button className=' bg-red-600 p-2 rounded-lg' onClick={() => handleDelete(profile)}>Delete</button>
</div>
</div>
      </div>
     
     
     
     
      {error && <p>Error: {error.message}</p>}
      {openDelete && <Delete setOpenDelete={setOpenDelete} data={selectedDelete} />}
    
      {openEdit && <Edit setOpenEdit={setOpenEdit} data={selectedProfile} />}
    </div>) : (
      <Navigate to="/login" /> 
    )}
       </>
  );
};

export default Home;
