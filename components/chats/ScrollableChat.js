import React, { useRef, useEffect } from 'react';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser
} from '../../utils/chat';
import Moment from 'moment';

const ScrollableChat = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} className="sender-receiver-box">
            {/* <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#ddd' : '#202028'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%'
              }}
            >
              {m.message}
            </span> */}

            {m.sender._id === user._id ? (
              <div className="sender_box">
                <span className="sender">{m.message}</span>{' '}
                <span className="msg_time">
                  {Moment(m.createdAt).format('hh:mm A')}
                </span>
              </div>
            ) : (
              <div className="receiver_box">
                <span className="msg_time">
                  {Moment(m.createdAt).format('hh:mm A')}
                </span>
                <span className="receiver">{m.message}</span>
              </div>
            )}
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default ScrollableChat;
