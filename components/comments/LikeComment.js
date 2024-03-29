import { useState } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';

const Like_Comment = ({ postId, comment, user }) => {
  const isLiked =
    user && comment.likes.filter((like) => like.user === user._id).length > 0;

  const [likecomment, setLikeComment] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(comment.likes.length);

  const likehandlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${baseURL}/api/comments/like/${postId}/${comment._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    const data = await res.json();
    setLikeComment(!likecomment);
    setLikeCount(data);
  };
  return (
    // <div className="like_btn " onClick={likehandlesubmit}>
    <div  onClick={likehandlesubmit}>
      {likecomment ? (
        <button className="flex gap-2 ">
          <img src="/assets/media/dash/fire.png" alt="" />{' '}
          <span>{likeCount}</span>
        </button>
      ) : (
        <button className="flex gap-2 ">
          <img src="/assets/media/dash/fire.png" alt="" />{' '}
          <span>{likeCount}</span>
        </button>
      )}
    </div>
  );
};

export default Like_Comment;
