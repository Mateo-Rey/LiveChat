import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Messages from "./Messages";
import Input from "./Input";
function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="ChatIcons">
        <i className="fa fa-info"/>
        <div></div>
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
