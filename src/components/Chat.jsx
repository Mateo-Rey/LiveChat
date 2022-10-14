import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
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

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
 
      
  const createGroupChat = async () => {
    const ids = userList
    .map((user) => {
      return user.uid;
    })
    .join("-");

    const groupChatId = ids + '-' + currentUser.uid

    const res = await getDocs(doc(db, "groupChats", groupChatId))
    if (!res.exists()) {
    setDoc(doc(db, "groupChats", groupChatId));
    } else {
      updateDoc(doc(db, "groupChats", groupChatId), )
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
        {/* <span>
          Selcted users:{" "}
          {userList.map((user) => {
            return <p key={user.displayName}>{user.displayName}</p>;
          })}
        </span> */}
        {/* <input
          type="text"
          value={username}
          placeholder="Add a friend..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
        <button onClick={createGroupChat}>
          <AiOutlineUserAdd size={28} />
        </button>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
