import { useContext } from "react";
import { ClientUserContext } from "../containers/ChatRoomContainer";
import ChatRoom from "./ChatRoom";
import { Link, Outlet } from "react-router-dom";

const ChatRoomList = ({chatRooms, clickChatRoom}) => {

    const clientUser = useContext(ClientUserContext);

    const chatRoomData = chatRooms.map((chatRoom) => (
       <ChatRoom key={chatRoom.id} chatRoomName={chatRoom.name} chatRoomId = {chatRoom.id} clickChatRoom={clickChatRoom}/>
    ))

    return ( 
        <>
            <Outlet/>
            <h2 className="main-header" >Welcome to your BNTA Chat Rooms</h2>
            <Link to="/create/chatrooms"><button>Create new chatRoom</button></Link>
            <ul>{chatRoomData}</ul>
        </>
    );
}

export default ChatRoomList;