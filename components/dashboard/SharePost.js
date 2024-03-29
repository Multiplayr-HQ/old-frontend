import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';


const queryClient = new QueryClient();

export default function SharePost({ postId, isShared }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Post_share postId={postId} isShared={isShared} />
    </QueryClientProvider>
  );
}

const Post_share = ({ postId, isShared }) => {
  const [share, setShare] = useState(isShared);

  const handleShare = (e) => {
    e.preventDefault();
    mutate({ share });
    setShare(!share);
  };

  const addingShare = async () => {
    const res = await fetch(`${baseURL}/api/posts/share/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    if (share !== true) {
      toast.success('Shared in your timeline successfully');
    } else {
      toast.success('Removed from your timeline');
    }
  };

  const { mutate } = useMutation(addingShare);

  return (
    <a onClick={handleShare}>
      {share ? (
        <>
          <span className="shared"></span>
          <span>Shared</span>
        </>
      ) : (
        <>
          <span className="shares"></span>
          <span>Share</span>
        </>
      )}
    </a>
  );
};
