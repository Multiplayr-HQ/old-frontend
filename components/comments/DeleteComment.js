import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function DeleteComment({ post, comment, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Delete_Comment post={post} comment={comment} user={user} />
    </QueryClientProvider>
  );
}

const Delete_Comment = ({ post, comment, user }) => {
  const DeleteComment = async () => {
    await axios.delete(`${baseURL}/api/comments/${post._id}/${comment._id}`, {
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const { mutateAsync } = useMutation(DeleteComment);

  const deletehandlesubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(comment);
      queryClient.invalidateQueries();
      toast.success('Your comment has been successfully deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <div className="delete_comment">
      {comment.user != null ? (
        comment.user._id === user._id ? (
          <button onClick={deletehandlesubmit}>Delete</button>
        ) : (
          []
        )
      ) : (
        ''
      )}
    </div>
  );
};
