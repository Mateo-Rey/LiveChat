import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
function Navbar() {

    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='logo'>Swifter Chat</span>
        <div className='user'>
            <img src={currentUser.photoURL}/>
            <span>{currentUser?.displayName}</span>
            <button onClick={() => signOut(auth) && navigate("/login")}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar