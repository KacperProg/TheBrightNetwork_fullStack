import { useEffect, useState ,useContext, createContext } from "react";
import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import ChatRoomList from "../components/ChatRoomList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../components/Home";

export const ClientUserContext = createContext();

const ChatRoomContainer = () => {
    
    const [clientUser,setClientUser] = useState([
        
        {   
            name: null,
            id: null,
            role: null

        }
    ]);
    const [chatRooms,setChatRooms] = useState([]);
    const [allUsers,setAllUsers] = useState([]); 
   
    // const ClientUserContext = createContext();
    
    const clientUserId = () => {
        // const clientData = clientUser.id;
        return (<ClientUserContext.Provider value = {clientUser}>
                </ClientUserContext.Provider>)
              
    }

    const setLoginInUser = async (userId) => {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        const jsonData = await response.json();
        setClientUser({
            name: jsonData.name,
            id: jsonData.id,
            role: jsonData.role,
          });        
      
        
    }

    const getAllUserChatRooms = async () => {
        const response = await fetch(`http://localhost:8080/chatrooms`);
        const jsonData = await response.json();
        const userChatRooms = jsonData.filter((chatRoom) => {
            const subscriptions = chatRoom.subscriptions || [];
            return subscriptions.some((subscription) => subscription.user.id === clientUser.id);
        });

        setChatRooms([...userChatRooms]);
    }

    const getAllUsers = async () => {
        const response = await fetch(`http://localhost:8080/users`);
        const jsonData = await response.json();
        const users = jsonData.filter((user) => {
            return user.id !== clientUser.id
        });

        setAllUsers([...users])
    }

    useEffect(() => {
        clientUserId();
        getAllUserChatRooms();
        getAllUsers();
        console.log(allUsers);

    },[clientUser])

    // useEffect(() => {
    //     console.log(allUsers);
    // },[])

    const chatRoomRoutes = createBrowserRouter([
        {
            path: "/",
            element: <>
                    
                    <ClientUserContext.Provider value={clientUser}>
                    <Home allUsers={allUsers}/>,
                    </ClientUserContext.Provider>
                </>,
            children: [
                {
                    path: "/main-page",
                    element: <>
                    
                        <ClientUserContext.Provider value={clientUser}>
                        <ChatRoomList chatRooms={chatRooms} />
                        </ClientUserContext.Provider>
                    </>
                },
                {
                    path: "/login",
                    element: <>
                    
                        <ClientUserContext.Provider value={clientUser}>
                        <LogInForm setLoginInUser={setLoginInUser} />
                        </ClientUserContext.Provider>
                    </>
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router = {chatRoomRoutes} />
        </>
    );
}
 
export default ChatRoomContainer;