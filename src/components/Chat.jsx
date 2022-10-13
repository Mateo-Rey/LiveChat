import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
function Chat() {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user?.displayName}</span>
        <div className="ChatIcons">
        <AiOutlineUserAdd size={28}/>
        <MdOutlineVideoCameraFront size={28}/>
        <BiDotsVerticalRounded size={28}/>
         </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
