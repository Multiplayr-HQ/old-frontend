import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const PinnedComments = ({ post, comment, user }) => {
  const [pinnedcomment, setPinnedComment] = useState(false);

  const pincommenthandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ pinnedcomment });
    setPinnedComment(true);
  };
  const isPinned =
    user &&
    comment.pinned_comments.filter((pin) => pin.commentId === comment._id)
      .length > 0;

  const isAuthorized = post.user !== '' && post.user?._id === user?._id;

  const addPinComment = async () => {
    const { data } = await fetch(
      `${baseURL}/api/comments/pin/${post._id}/${comment._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    return data;
  };
  const { mutate } = useMutation(addPinComment, {
    onSuccess: (data) => {
      const old = queryClient.getQueryData(['comments', comment._id]);
      queryClient.setQueryData(['comments', comment._id], {
        ...old,
        pinned_comments: data.pinned_comments
      });
    }
  });

  const handleUser = (e) => {
    e.preventDefault();
    toast.info('UnAuthorized to unpin the comment');
  };

  return (
    <>
      {isPinned ? (
        <button
          className="pinned"
          onClick={isAuthorized ? pincommenthandlesubmit : handleUser}
        >
          <span>Pinned By Creator</span>
        </button>
      ) : (
        isAuthorized && (
          <button className="pinned" onClick={pincommenthandlesubmit}>
            <i className="fa fa-thumb-tack" aria-hidden="true"></i>
          </button>
        )
      )}
    </>
  );
};

export default PinnedComments;
