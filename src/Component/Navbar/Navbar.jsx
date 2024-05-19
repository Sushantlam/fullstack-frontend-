import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
 
import { DarkContext } from '../../Context/Button';
import { AuthContext } from '../../Context/Auth';


const Nav = () => {
  const { state, dispatch } = useContext(DarkContext);
  const { token, dispatchAuth } = useContext(AuthContext); 
  console.log(state);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const hanldeClick = () => {
    try {
      dispatchAuth({ type: 'Logout' }); 
      navigate('/login');
    } catch (error) {}
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg">
      <div className="flex justify-between items-center h-16  px-3">
        <h3 className=' text-2xl ' style={{ color: state.theme === "light" ? "black" : "white", right: state.theme === "light" ? "2px" : "unset" }}>Lama</h3>
        <div className="flex justify-between gap-5">
          <div className="flex justify-between items-center border-2 rounded-3xl cursor-pointer px-2 gap-3 relative " onClick={() => dispatch({ type: "CHANGE_THEME" })}>
            <div>🌙</div>
            <div>🔆</div>
            <div className="border rounded-full bg-lime-400 h-[25px] w-[30px] absolute" style={state.theme === "light" ? { left: "2px" } : { right: "2px" }}></div>
          </div>
          <button className="bg-lime-400 p-2 rounded-xl" onClick={hanldeClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;