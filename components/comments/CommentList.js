import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import LikeComment from './LikeComment';
import DeleteComment from './DeleteComment';

import ReplyComment from './replies/ReplyComment';
import ReplyList from './replies/ReplyList';
import { formatDistanceToNowStrict } from 'date-fns';
import PinnedComments from './PinnedComments';
import ReportsComments from './report';

const CommentList = ({ post, user, comments }) => {
  const postId = post._id;
  const [value, setValue] = useState({
    type: 'all comments'
  });
  const n = 3;
  const [commentsData, setCommentsData] = useState([]);
  const [next, setNext] = useState(n);

  const handleMoreImage = () => {
    setNext(next + n);
  };

  const handleCollapse = () => {
    setNext(n);
  };

  let options = ['Popular Comments', 'Newest Comments', 'Pinned Comments'];
  const handleChangeCheck = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/commentData/${post._id}/${value?.type}`)
      .then((res) => {
        setCommentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post._id, value]);

  return (
    <div>
      <div className="post_comments">
        <div className="pop_comment">
          <select
            name="type"
            id="type"
            value={value.type}
            onChange={handleChangeCheck}
            className="form-control"
          >
            <option value="All Comments">All comments</option>
            {options.map((opt, ido) => (
              <option key={ido} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {comments?.length === 0 ? (
          <p>There are no comments for this post.</p>
        ) : (
          <div>
            {commentsData?.length === 0
              ? comments.slice(0, next).map((comment) => (
                  <div key={comment._id} className="single_comment_sec">
                    <div className="comments_point">
                      <LikeComment postId={postId} comment={comment} />
                      <div className="comment_round_box">
                        <div className="user">
                          <img src={comment.user?.profilePicUrl} alt="" />
                        </div>
                        <div className="create">
                          <a
                            href={`/user/${comment?.user?.username}`}
                            className=""
                          >
                            {comment.user != null
                              ? comment.user?.name
                              : 'NOT DEFINED'}
                          </a>{' '}
                          <h3>{comment.text}</h3>
                        </div>
                        <PinnedComments
                          user={user}
                          comment={comment}
                          post={post}
                        />
                      </div>

                      {(post.user?._id === user._id &&
                        comment.user?._id === user._id) ||
                      comment.user?._id === user._id ? null : (
                        <ReportsComments />
                      )}
                    </div>
                    <div className="time_del_rep">
                      <span className="days">
                        {formatDistanceToNowStrict(new Date(comment.date), {
                          addSuffix: true
                        })}
                      </span>
                      <div className="first_reply">
                        <DeleteComment
                          post={post}
                          comment={comment}
                          user={user}
                        />
                        <ReplyComment post={post} comment={comment} />
                      </div>
                    </div>

                    <ReplyList post={post} comment={comment} user={user} />
                  </div>
                ))
              : commentsData.slice(0, next).map((comment) => (
                  <div key={comment._id} className="single_comment_sec">
                    <div className="comments_point">
                      <LikeComment
                        postId={postId}
                        comment={comment}
                        user={user}
                      />
                      <div className="comment_round_box">
                        <div className="user">
                          <img src={comment.user?.profilePicUrl} alt="" />
                        </div>
                        <div className="create">
                          <a
                            href={`/user/${comment?.user?.username}`}
                            className=""
                          >
                            {comment.user != null
                              ? comment.user?.name
                              : 'NOT DEFINED'}
                          </a>{' '}
                          <h3>{comment.text}</h3>
                        </div>
                        <PinnedComments
                          user={user}
                          comment={comment}
                          post={post}
                        />
                      </div>

                      {(post.user?._id === user._id &&
                        comment.user?._id === user._id) ||
                      comment.user?._id === user._id ? null : (
                        <ReportsComments />
                      )}
                    </div>
                    <div className="time_del_rep">
                      <span className="days">
                        {formatDistanceToNowStrict(new Date(comment.date), {
                          addSuffix: true
                        })}
                      </span>
                      <div className="first_reply">
                        <DeleteComment
                          post={post}
                          comment={comment}
                          user={user}
                        />
                        <ReplyComment post={post} comment={comment} />
                      </div>
                    </div>

                    <ReplyList post={post} comment={comment} user={user} />
                  </div>
                ))}
          </div>
        )}
      </div>

      {/* <div className="thx_msg">
        <p>Thank you everyone for all of your support.</p>
      </div> */}
      <div className="loadmore">
        {next < comments?.length ? (
          <button className="" onClick={handleMoreImage}>
            Load comments{' '}
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </button>
        ) : (
          <>
            {comments?.length < n ? null : (
              <button className="" onClick={handleCollapse}>
                Collapse <i className="fa fa-angle-up" aria-hidden="true"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentList;
