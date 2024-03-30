import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const Reply_Comment = ({ post, comment }) => {
  const [reply, setReply] = useState('');
  const [replyModal, setReplyModal] = useState(false);

  const onChange = (e) => {
    setReply(e.target.value);
  };

  const replyhandle = () => {
    mutate({ reply });
    setReply('');
    setReplyModal(false);
  };

  const addreply = async () => {
    try {
      const res = await fetch(
        `${baseURL}/api/comments/${post._id}/${comment._id}`,
        {
          method: 'POST',
          body: JSON.stringify({
            reply
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: cookie.get('token')
          }
        }
      );
      return await res.json();
    } catch (error) {console.log(error);}
  };

  const { mutate } = useMutation(addreply, {
    onSuccess: (successData) => {
      console.log(successData);
    }
  });

  return (
    <>
      <div className="reply_comment m-0">
        {' '}
        <button onClick={() => setReplyModal((state) => !state)}>Reply</button>
      </div>

      {replyModal && (
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            placeholder="Add a reply"
            name="text"
            value={reply}
            onChange={onChange}
            required
          ></textarea>
          <button
            onClick={() => setReplyModal(false)}
            className="reply_cancel btn"
          >
            Cancel
          </button>
          <button onClick={replyhandle} className="reply_cancel btn">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default Reply_Comment;
