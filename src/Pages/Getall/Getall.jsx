import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Navigate } from 'react-router-dom';
import Nav from '../../Component/Navbar/Navbar';
import { DarkContext } from '../../Context/Button';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'images', headerName: 'Images', width: 200, renderCell: (params) => <img src={params.value.url} alt="User" style={{ width: 50, height: 50, paddingTop: 10, paddingBottom:10, borderRadius: '100%' }} /> },
  { field: 'userName', headerName: 'Full Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'password', headerName: 'Password', width: 200 },
];

const Getall = () => {
  const { isAdmin } = useContext(AuthContext);
  const { state } = useContext(DarkContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://backend-pgtt.onrender.com/api/auth/all');
        // Add a unique ID to each row
        const rowsWithId = res.data.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isAdmin ? (
        <div className="px-4 min-h-[100vh] bg-dark-bg py-2" id={state.theme}>
          <Nav />
          <div style={{ height: 400, width: '100%', color: state.theme === "light" ? "black" : "white", right: state.theme === "light" ? "2px" : "unset" }} className='mt-5'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              id={state.theme}
              
            />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Getall;
