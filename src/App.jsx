import { useState } from 'react'
import Login from './Pages/Login/Login';
import {
  BrowserRouter as Router,
 Routes,
  Route
} from "react-router-dom";
import './App.css'
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import Getall from './Pages/Getall/Getall';
import Verify from './Pages/Verify/Verify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signin/>}/>
        <Route path='/getall' element={<Getall/>}/>
        <Route path='/verify/:id' element={<Verify/>}/>
        
        </Routes>
    </Router>
    </>
  )
}

export default App
