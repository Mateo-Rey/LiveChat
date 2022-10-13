import React, {useContext, useState} from 'react'
import {IoIosAttach} from 'react-icons/io'
import {BsImage} from 'react-icons/bs'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import { updateDoc, doc, arrayUnion, Timestamp } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async () => {
    if(img) {

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }
  }
  return (
    <div className='input'>
        <input type='text' placeholder='Say something...' onChange={(e) => setText(e.target.value)} />
        <div className='send'>
            <div className='img'>
            <IoIosAttach  size={28}/>
            </div>
            <input type='file' style={{display:'none'}} id='file' onChange={(e) => setImg(e.target.files[0])} />
            <label htmlFor='file'>
                <div className='img'>
            <BsImage  size={28}/>
            </div>
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input