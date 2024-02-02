import { useState } from 'react';
import baseURL from '../../../utils/baseURL';
import cookie from 'js-cookie';

const Like_Reply = ({ postId, commentId, reply, user }) => {
  const isLiked =
    user && reply.likes.filter((rpy) => rpy.user === user._id).length > 0;

  const [likereplies, setLikeReplies] = useState(isLiked);
  const [likeReplyCount, setLikeReplyCount] = useState(reply.likes.length);

  const likehandlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${baseURL}/api/comments/like/${postId}/${commentId}/${reply._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    const data = await res.json();
    setLikeReplies(!likereplies);
    setLikeReplyCount(data);
  };

  return (
    <div className="reply_like" onClick={likehandlesubmit}>
      {likereplies ? (
        <button>
          <img src="/assets/media/dash/fire.png" alt="" />
          <span>{likeReplyCount}</span>
        </button>
      ) : (
        <button>
          <img src="/assets/media/dash/fire.png" alt="" />
          <span>{likeReplyCount}</span>
        </button>
      )}
    </div>
  );
};

export default Like_Reply;
