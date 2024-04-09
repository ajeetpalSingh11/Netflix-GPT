import React, { useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';

const Login = () =>{

    const [isSignInForm, setIsSignInForm] = useState(true);
    const handleClickSignUp = (e)=>{
        setIsSignInForm(!isSignInForm);
        e.preventDefault();
    }

    return <div>
        <Header/>
        <div className='absolute'>
            <img src={BG_URL} alt="background-img"/>
        </div>
        <form className='w-3/12 bg-black absolute mt-24 mx-auto right-0 left-0 p-8 flex flex-col text-white rounded-lg'>
            <h2 className='font-bold text-2xl mb-2'> {isSignInForm ? "Sign In" : "Sign Up"}</h2>
            {!isSignInForm && <input type='text' className='py-3 px-4 mt-6 bg-gray-700 rounded-md' name="Full Name" placeholder='Full Name' />}
            <input type='text' className='py-3 px-4 mt-6 bg-gray-700 rounded-md' name="Email Address" placeholder='Email or Phone Number' />
            <input type='password' className='py-3 px-4  mt-6  bg-gray-700 rounded-md' name="Password" placeholder='Password' />
            <button className='w-full bg-red-700 rounded-md px-4 py-3 my-8 text-center'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4'>{isSignInForm ? "New to Netflix?" : "Already a User?"} <button className='text-gray-400 underline' onClick={handleClickSignUp}>{isSignInForm ? "Sign Up Now" : "Sign In"}</button></p>
        </form>
    </div>;
}

export default Login ;
