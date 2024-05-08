import baseURL from '../../../utils/baseURL';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

const Delete_Reply = ({ post, comment, reply, user }) => {
  const isDelete = reply.user != null ? ( reply.user._id === user._id ) : false;
  const deletereply = async () => {
    await axios.delete(
      `${baseURL}/api/comments/${post._id}/${comment._id}/${reply._id}`,
      {
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
  };

  const { mutateAsync } = useMutation(deletereply);

  const deletehandlesubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(comment._id);
      toast.success('Your comment has been successfully deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="delete_btn">
      {isDelete && <button onClick={deletehandlesubmit}>Delete</button>}
    </div>
  );
};

export default Delete_Reply;
