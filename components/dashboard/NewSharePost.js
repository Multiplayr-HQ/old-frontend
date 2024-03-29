import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import { paperPlaneOutline } from 'ionicons/icons';

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
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(addingShare);

  return (
    // <a onClick={handleShare}>
    <>
      <button
        onClick={handleShare}
        type="button"
        className={`button-icon flex items-center justify-center rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700 ${
          share ? 'text-primary1 bg-background' : 'text-white'
        }`}
      >
        <IonIcon className="text-xl" icon={paperPlaneOutline} />
      </button>
    </>
    // </a>
  );
};
