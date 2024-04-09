import React from 'react'
import {LOGO} from '../utils/constants';
const Header = () => {
  return (
    <div className='absolute px-4 py-2 bg-gradient-to-b from-black z-30'>
        <img className='w-44' src={LOGO} alt='logo'/>
    </div>
  )
}

export default Header