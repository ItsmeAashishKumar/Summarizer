import React from 'react'
import logo from '../assets/logo.jpg'
import './Nav.css'

function Nav() {

  function handleClick(){
    window.location.href='https://github.com/ItsmeAashishKumar?tab=repositories'
  }
  return (
    <div className='nav'>
      <div className='nav-ele'>
        <img className='nav-logo' src={logo} alt='logo' width='60px'/>
        <h1 className='nav-heading montserrat'>SUMZ</h1>
      </div>
      <div className='nav-btn'>
        <button className='btn' onClick={handleClick} role='button'>GITHUB</button>
      </div>
    </div>
  )
}

export default Nav

