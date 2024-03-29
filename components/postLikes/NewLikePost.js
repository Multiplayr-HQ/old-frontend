import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';

const queryClient = new QueryClient();

export default function LikePost({ postId, isLiked, post }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AddLike postId={postId} isLiked={isLiked} post={post} />
    </QueryClientProvider>
  );
}

const AddLike = ({ postId, isLiked, post }) => {
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLike = (e) => {
    e.preventDefault();
    mutate({ like });
    setLike(!like);
    if (like){
      setLikeCount(count=>count-1)
    }else{
      setLikeCount(count=>count+1)
    }
  };

  const addingLike = async () => {
    const res = await fetch(`${baseURL}/api/posts/like/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addingLike);

  return (
    <>
      <a onClick={handleLike} href="#!">
        <>
          <button
            type="button"
            className={`button-icon flex items-center justify-center rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700 ${
              like ? 'text-primary1 bg-background' : 'text-white'
            }`}
          >
            <IonIcon className="text-2xl" icon={heart} />
          </button>
        </>
      </a>
      <span className=" -m-1.5 mr-2">{likeCount}</span>
    </>
  );
};
