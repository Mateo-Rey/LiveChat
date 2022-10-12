import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <span className='logo'>Lama Chat</span>
        <div className='user'>
            <img src="" alt="" />
            <span>John</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar