import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signin = () => {

    const navigate = useNavigate();

  const [item, setItem] = useState({
    userName: '',
    email: '',
    password: '',
    images: null,

  });

const [error, setError] = useState('')
const [message, setMessage] = useState('')

  const handleChnage = (e) => {
    const { id, value } = e.target;

    setItem({
      ...item,
      [id]: value,
    });
    
  };
  console.log(item);

  const handleImage = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    console.log(file);
      setItem({
        ...item,
        images: file,
      });
  
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('images', item.images)
        formData.append('userName', item.userName)
        formData.append('email', item.email)
        formData.append('password', item.password)
        
       
        try {
          const res = await axios.post('https://backend-pgtt.onrender.com/api/auth/signup', formData);
          console.log(res.data.message);
          setMessage(res.data.message)
    
          toast('User created successfully!');
          if(res){
            setTimeout(() => {
              navigate('/login');
              setItem({
                  userName: '',
                  email: '',
                  password: '',
                  images: null,
              
              });
            }, 2500)
    
          }
    
        
        
         
          
        } catch (error) {
          console.log(error.response.data);
          setError(error?.response?.data)
        }
      };
     
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
    <form className='flex flex-col gap-5 border border-gray-800 rounded-md px-6  py-4' onSubmit={handleClick}>
    <label htmlFor="">UserName</label>
               <input  type="text" id="userName" required onChange={handleChnage} value={item.userName}  className=' p-1 border-2 rounded-md'  />
             <label htmlFor="">Email</label>
               <input  type="text" id="email" required onChange={handleChnage} value={item.email}  className=' p-1 border-2 rounded-md'  />
               <label htmlFor="">Password</label>
               <input type="password" id="password" required onChange={handleChnage}  value={item.password}   className=' p-1 border-2 rounded-md'  />

               <label htmlFor="">Choose Photo</label>
               <input  type='file'
                id='images'
                accept='.jpeg, .png, .jpg' onChange={handleImage}   required  className=' p-1 border-2 rounded-md'  />
 
       

<button className=' bg-lime-400 p-2 border rounded-xl' type='submit'>Sign Up</button>
{message && <span className=' px-2 py-1 text-green-600 rounded-lg'>{message}</span> }
{error && <span className=' px-2 py-1 text-red-600 rounded-lg'>{error}</span> }
<Link to='/login'>   <span className=' px-2 py-1 text-blue-600 rounded-lg'>Already have account? Sign In</span></Link>
   
      </form>
    </div>
  )
}

export default Signin