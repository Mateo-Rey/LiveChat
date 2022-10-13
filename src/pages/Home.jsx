import React from 'react'
import { useContext } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'

function Home() {

  const {currentUser} = useContext(AuthContext)

  if (!currentUser) (window.location.reload(false))
  return (
    <div className='home'>
        <div className='container'>
        <Sidebar/>
        <Chat/>
        </div>
    </div>
  )
}

export default Home