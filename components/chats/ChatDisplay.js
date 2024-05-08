import React from 'react';
import { useAppContext } from './ChatProvider';
import SingleChat from './SingleChat';

const ChatDisplay = ({ fetchAgain, setFetchAgain, user }) => {
  return (
    <>
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        user={user}
      />
    </>
  );
};

export default ChatDisplay;
