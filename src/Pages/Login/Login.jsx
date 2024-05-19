import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { token, dispatchAuth, error } = useContext(AuthContext);
   
    const [credential, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...credential, [id]: value });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatchAuth({ type: 'Login_Start' });
        try {
            const res = await axios.post('https://backend-pgtt.onrender.com/api/auth/login', credential);
            console.log(res);
            console.log(res.data.details.isAdmin);
            if(res.data.details.isAdmin){
              dispatchAuth({ type: 'Login_Sucess', payload: res.data.details });
              console.log(token);
              navigate('/getall');
            }
            else{
              dispatchAuth({ type: 'Login_Sucess', payload: res.data.details });
              console.log(token);
              navigate('/');
            }
           
        } catch (error) {
            dispatchAuth({ type: 'Login_Fail', payload: error.response.data });
        }
    }

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <form className='flex flex-col gap-5 border border-gray-800 rounded-md px-6 py-4' onSubmit={handleClick}>
                <label htmlFor="">Email</label>
                <input type="text" id="email" onChange={handleChange} required className='p-1 border-2 rounded-md' />
                <label htmlFor="">Password</label>
                <input type="password" id="password" onChange={handleChange} required className='p-1 border-2 rounded-md' />
                {error && <p className='text-red-600'>{error}</p>}
                <button className='bg-lime-400 p-2 border rounded-xl' type='submit'>Login</button>
                <Link to='/signup'><span className='px-2 py-1 text-blue-600 rounded-lg'>Don't have an account? Sign Up</span></Link>
            </form>
        </div>
    );
}

export default Login;
