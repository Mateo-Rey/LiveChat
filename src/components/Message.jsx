import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

function Message({message}) {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  return (
    <div className='message owner'>
        {/* <div className='messageInfo'>
            <img src="" alt="" />
            <span>just now</span>
        </div>
        <div className='messageContent'>
            <p>hello</p>
            <img src="" alt="" />
        </div> */}
    </div>
  )
}

export default Message