import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getUserFromLocalStorage('user');
    setUser(loggedInUser);
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useAppContext };
