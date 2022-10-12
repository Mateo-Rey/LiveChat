import React from 'react'
import {IoIosAttach} from 'react-icons/io'
import {BsImage} from 'react-icons/bs'
function Input() {
  return (
    <div className='input'>
        <input type='text' placeholder='Say something...' />
        <div className='send'>
            <div className='img'>
            <IoIosAttach  size={28}/>
            </div>
            <input type='file' style={{display:'none'}} id='file' />
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