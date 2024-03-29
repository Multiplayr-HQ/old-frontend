import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import CommentList from './CommentList';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify'; 

const CommentForm = ({ post, user }) => {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/comments/${post._id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post._id]);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  let x = {};
  const handleButtonForm = async (e) => {
    e.preventDefault();
    let formdata = {
      comment: comment
    };
    try {
      await axios
        .post(`${baseURL}/api/comments/${post._id}`, formdata, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => (x = res.data));
      setComment('');
      setComments([...comments, x]);
    } catch (error) {
      toast.error(error);
    }
  };

  if (post) {
    return (
      <div>
      <CommentList post={post} user={user} comments={comments} />
        <form className="add_comment_box" onSubmit={handleButtonForm}>
          <div className="add_comments">
            <div className="user">
              <img src={user?.profilePicUrl} alt="" />
            </div>
            <textarea
              placeholder="Add a comment"
              name="text"
              value={comment}
              onChange={onChange}
            ></textarea>
          </div>
          <button type="submit">
            <img src="/assets/media/icons/Send.png" alt="" />
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default CommentForm;
