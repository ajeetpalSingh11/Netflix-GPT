import React from 'react'
import {LOGO} from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { USER_AVATAR } from '../utils/constants';
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../redux/userSlice';

const Header = () => {
  const user = useSelector((store)=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser())
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
    
  }
  
  return (
    <div className='absolute w-full flex justify-between px-4 py-2 bg-gradient-to-b from-black z-30'>
        <img className='w-44' src={LOGO} alt='logo'/>
        {user!==null ? <div className='flex mt-3 gap-3 h-10'>
          <img className='rounded-md' alt="user_avatar" src={USER_AVATAR}/>
          <button onClick={handleSignOut} className='font-semibold text-white' >Sign Out</button>
          </div> : null}
    </div>
  )
}

export default Header