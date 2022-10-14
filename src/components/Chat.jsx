import React from "react";
import { updateProfile } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { db } from "../firebase";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
function Chat() {
  const { data } = useContext(ChatContext);
  const [userList, setUserList] = useState([]);
  const [err, setErr] = useState(false);
  const [username, setUsername] = useState("");
  const {currentUser} = useContext(AuthContext)
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const handleAvatarChange = async () => {
    

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${currentUser.displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar)
      

      await uploadTask.then(() => {
        getDownloadURL(storageRef).then( async (downloadURL) => {
            updateProfile(currentUser, {photoURL: downloadURL})
          });
        })
      
    
  }

  function handleKey(e) {
  e.code === "Enter" && handleSearch();
}
 
      
  const createGroupChat = async () => {
    const ids = userList
    .map((user) => {
      return user.uid;
    })
    .join("-");

    const combinedId = ids + '-' + currentUser.uid

    const res = await getDocs(doc(db, "groupChats", combinedId))
    if (!res.exists()) {
    setDoc(doc(db, "groupChats", combinedId));
    } else {
      updateDoc(doc(db, "groupChats", combinedId), {
        
      } )
    }
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserList([...userList, doc.data()]);
      });
    } catch (err) {
      setErr(true);
    }
  };
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user?.displayName}</span>
        <input className="avatarInput" type='file' id='avatarChange' onChange={(e) => setAvatar(e.target.files[0])}/>
        <label htmlFor="avatarChange">Change Avatar</label>
        <button onClick={handleAvatarChange}>Update Avatar</button>
        {/* <div className="createGroupChat">
        <span>
          Selcted users:{" "}
          {userList.map((user) => {
            return <p key={user.displayName}>{user.displayName}</p>;
          })}
        </span>
        <input
          type="text"
          value={username}
          placeholder="Add a friend..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={createGroupChat}>
          <AiOutlineUserAdd size={28} />
        </button>
        </div> */}
      </div>
      
      
      <Messages />
      <Input />
      
    </div>
  );
}

export default Chat;
