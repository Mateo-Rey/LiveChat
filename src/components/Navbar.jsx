import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
function Navbar() {
    const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='logo'>Lama Chat</span>
        <div className='user'>
            <img src={currentUser?.photoURL}/>
            <span>{currentUser?.displayName}</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar