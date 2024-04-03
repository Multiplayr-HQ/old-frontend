import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Report from '../comments/report';

const CustomPost = ({ post, user }) => {
  const [posts, setPosts] = useState([post]);
  const [description, setDescription] = useState(posts[0].description);
  const [image, setImage] = useState(posts[0].images);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isOriginalImages, setIsOriginalImages] = useState(true);

  const [shareToModal, setShareToModal] = useState(false);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_ESPORTS_API_BASE_URL}/posts`;
  // Delete a post
  const del = async (post) => {
    await axios.delete(`${baseURL}/api/posts/${post._id}`, {
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const { mutateAsync } = useMutation(del);

  const deletehandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(post);
      toast.success('Your post has been successfully deleted');
      refreshData();
      setDeleteModal(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  // EDIT A Post
  const imageChange = (e) => {
    setImage(e.target.files[0]);
    setIsOriginalImages(false);
  };
  const mutation = useMutation(
    async (formData) =>
      await axios.patch(`${baseURL}/api/posts/${post._id}`, formData, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );
  const edithandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (description.trim() === '') {
      return toast.error('Please add a description');
    }

    formData.append('description', description);
    formData.append('isOriginalImages', isOriginalImages);
    if (image) {
      formData.append('image', image);
    }

    try {
      await mutation.mutateAsync(formData);
      toast.success('Successs');
      setEditModal(false);
      refreshData();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  function onCopy() {
    toast.success('Copied to Clipboard!');
    setCopied(true);
  }

  return (
    <>

      <ul className='flex w-full flex-col gap-1 mb-3 text-md text-white -z-3'>
        {post.user?._id === user?._id ? (
          <>
            <li className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
              <button onClick={() => setEditModal(true)}>Edit</button>
            </li>
            <li className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
              <button onClick={() => setDeleteModal(true)}>Delete</button>
            </li>
          </>
        ) : null}
        <li className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
          <button onClick={() => setShareToModal(true)}>Share to</button>
        </li>
        <li className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
          <CopyToClipboard onCopy={onCopy} text={`${shareUrl}/${post._id}`}>
            <button>Copy Link</button>
          </CopyToClipboard>
        </li>
        {/* <li className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
          <Report type="Post" />
        </li> */}
      </ul>


      {editModal && (
        <div className="edit_post">
          <form onSubmit={edithandleSubmit}>
            <h4>Edit Post</h4>
            <button onClick={() => setEditModal(false)} className="close">
              {' '}
              X{' '}
            </button>

            <div className="team_slider">
              <ul className="user_slider">
                <li>
                  <img src={post.user.profilePicUrl} alt="" />
                </li>
              </ul>
            </div>

            <textarea
              placeholder="Edit a post"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="right_links d-flex edit_share">
              <div className="post_img">
                <input
                  type="file"
                  id="files"
                  name="files[]"
                  accept="image/*"
                  multiple=""
                />
                <label htmlFor="files">
                  <span>
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                  </span>
                </label>
              </div>
              {/* <a href="#">
                <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
              </a> */}
              <a href="#">
                <i className="fa fa-gamepad" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i className="fa fa-video-camera" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
            <button onClick={() => setEditModal(false)} className="btn">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isLoading} className="btn">
              Submit
            </button>
          </form>

          <div className="overlay"></div>
        </div>
      )}

      {deleteModal && (
        <div className="delete_post">
          <form onSubmit={deletehandleSubmit}>
            <div className="delete_post_div">
              <p>Confirm on Deleting the Post?</p>
              <button onClick={() => setDeleteModal(false)} className="btn">
                Cancel
              </button>
              <button type="submit" className="btn">
                Confirm
              </button>
            </div>
          </form>
          <div className="overlay"></div>
        </div>
      )}
      {shareToModal && (
        <div className="delete_post share_to">
          <form>
            <div className="delete_post_div">
              <TwitterShareButton
                url={`${shareUrl}/${post?._id}`}
                title={'Multiplayr - Home of Esports'}
                via={'Multiplayrdotgg'}
                hashtags={['GG #Multiplayr']}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <FacebookShareButton
                url={`${shareUrl}/${post?._id}`}
                quote={'Multiplayr - Home of Esports'}
                via={'@Multiplayrdotgg'}
                hashtag={'#Multiplayr'}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>

              <TelegramShareButton
                url={`${shareUrl}/${post?._id}`}
                title={'Multiplayr - Home of Esports'}
              >
                <TelegramIcon size={40} round={true} />
              </TelegramShareButton>

              <WhatsappShareButton
                url={`${shareUrl}/${post?._id}`}
                title={'Multiplayr - Home of Esports'}
              >
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
              <button onClick={() => setShareToModal(false)} className="close">
                {' '}
                X{' '}
              </button>
            </div>
          </form>
          <div className="overlay"></div>
        </div>
      )}
    </>
  );
};

export default CustomPost;
