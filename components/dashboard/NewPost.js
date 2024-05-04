import React, { useState, useEffect, useRef } from 'react';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import Moment from 'moment';

import Lightbox from 'yet-another-react-lightbox';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import NewLikePost from '@components/postLikes/NewLikePost';
import NewCommentForm from '@components/comments/NewCommentForm';
import NewSharePost from '@components/dashboard/NewSharePost';

import UIkit from 'uikit';

import {
  bookmarkOutline,
  chatbubbleEllipses,
  chevronDownOutline,
  ellipsisHorizontal,
  flagOutline,
  heart,
  notificationsOffOutline,
  paperPlaneOutline,
  personAddOutline,
  shareOutline,
  stopCircleOutline
} from 'ionicons/icons';
import Follow from '../common/Follow';
import CopyToClipboard from 'react-copy-to-clipboard';
import CustomPost from './CustomPost';

const NewPost = ({ post, user, profiledata, followData, type, team }) => {
  const [comments, setComments] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const [open, setOpen] = useState(false);
  const slideshowRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const [a, setA] = useState([
    { src: 'https://adminmart.com/wp-content/uploads/2023/01/logo1.svg' }
  ]);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_ESPORTS_API_BASE_URL}/posts`;

  var followerList =
    followData && followData.map((follow) => follow.user?.username);

  useEffect(() => {
    const isFollow =
      profiledata &&
      profiledata.following
        ?.filter((profile) => profile.user === post.user?._id)
        .map((profile, ind) => profile.user).length > 0;
    setIsFollowing(isFollow);
  }, [profiledata, post]);

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

  const followhandlesubmit = async (Uid) => {
    setIsFollowing((prevState) => !prevState);
    try {
      await fetch(`${baseURL}/api/profile/follow/${Uid}`, {
        method: 'POST',
        headers: {
          Authorization: cookie.get('token')
        }
      });
    } catch (error) {}
    if (!isFollowing) {
      toast.success(`You are Following ${post.user.username}`);
    } else {
      toast.success(`You Unfollowed ${post.user.username}`);
    }
  };

  const isLoggedInUser = post.user !== '' && post.user?._id === user?._id;
  const isLiked =
    post.likes.filter((like) => like.user === user?._id).length > 0;
  const isShared =
    post.shares?.filter((share) => share.user?._id === user?._id).length > 0;

  const filtered = post.shares?.filter(
    (item) => followerList?.indexOf(item.user?.username) !== -1
  );

  function onCopy() {
    toast.success('Copied to Clipboard!');
    setCopied(true);
  }

  return (
    <>
      {/* main post start here  */}

      <div className="bg-[#242731] rounded-xl shadow-sm font-medium border1 dark:bg-[#242731] mb-2">
        <div className="flex gap-3 sm:p-4 p-4 font-medium">
          <a href="#">
            <img
              //   src="assets/images/avatars/avatar-3.jpg"
              src={
                post.post_type === 'user'
                  ? post?.user.profilePicUrl
                  : post?.profilepic
              }
              alt={post.post_type}
              className="w-12 h-12 rounded-full"
            />
          </a>
          <div className=" flex flex-1 justify-start items-start">
            <div className="">
              <div className="flex items-center">
                {post.game_tag[0]?.gameId === null ? (
                  <>
                    {post.post_type === 'team' ||
                    post.post_type === 'tour' ||
                    post.post_type === 'brand' ? (
                      <a
                        href={`/${post.post_type}/${
                          post.post_type === 'team'
                            ? post?.teamId
                            : post?.username
                        }`}
                      >
                        <h4 className="capitalize text-base">
                          {post.username}
                        </h4>{' '}
                        {/* Increased from sm to base */}
                      </a>
                    ) : (
                      <>
                        <a href={`/user/${post.user?.username}`}>
                          <h4 className="capitalize text-base">
                            {post.user?.name}
                          </h4>{' '}
                          {/* Increased from sm to base */}
                        </a>
                      </>
                    )}
                  </>
                ) : (
                  <h4 className="flex items-center text-base">
                    {' '}
                    {/* Increased from sm to base */}
                    {post.post_type === 'team' ||
                    post.post_type === 'tour' ||
                    post.post_type === 'brand' ? (
                      <a
                        href={`/${post.post_type}/${
                          post.post_type === 'team'
                            ? post?.teamId
                            : post?.username
                        }`}
                      >
                        <h4 className="capitalize">{post.username}</h4>
                      </a>
                    ) : (
                      <div className="flex items-center">
                        <a href={`/user/${post.user?.username}`}>
                          <h4 className="capitalize">{post.user?.name}</h4>
                        </a>
                        <span className="mx-1"> is playing </span>
                        <a
                          href={`/games/${post.game_tag[0]?.gameId}`}
                          className="game-name"
                        >
                          {post.game_tag[0]?.name}
                        </a>
                      </div>
                    )}
                  </h4>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-white/80">
                {' '}
                {/* Considered already small, not increased */}
                {Moment(post.createdAt).format('MMM, DD, YYYY hh:mm A')}
              </div>
            </div>

            <div className="ml-2">
              {post?.post_type === 'team' ? (
                <button>
                  <Follow
                    username={post.username}
                    type={post.post_type}
                    user={user}
                  />
                </button>
              ) : post?.post_type === 'tour' ? (
                <button>
                  <Follow
                    username={post.username}
                    type={post.post_type}
                    user={user}
                  />
                </button>
              ) : post?.post_type === 'brand' ? (
                <button>
                  <Follow
                    username={post.username}
                    type={post.post_type}
                    user={user}
                  />
                </button>
              ) : isLoggedInUser === false ? (
                <div
                  className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background -z-3"
                  // onClick={() => followhandlesubmit(post.user._id)}
                >
                  {
                    <>
                    {/* <div
                      className={`flex justify-center items-center text-${
                        isFollowing ? 'red-500' : 'primary1'
                      }`}
                    >
                      <IonIcon
                        className="text-xl shrink-0"
                        icon={isFollowing ? stopCircleOutline : ''}
                      />
                      <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>

                    </div> */}
                      <button className="btn" onClick={() => followhandlesubmit(post.user._id)}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>

                    </>
                  }
                </div>
              ) : null}
            </div>
          </div>

          <div className="-mr-1">
            <button type="button" className="button-icon w-8 h-8">
              {' '}
              <IonIcon className="text-xl" icon={ellipsisHorizontal} />{' '}
            </button>
            <div
              className="w-[245px] bg-inherit p-0"
              uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
            >
              <nav className="flex flex-col gap-2  my-3 text-md text-white -z-3">
                {/* <div className="flex justify-center items-center  h-10 p-2 w-full rounded-lg hover:bg-background">
                  <IonIcon
                    className="text-xl shrink-0"
                    icon={bookmarkOutline}
                  />{' '}
                  Add to favorites{' '}
                </div> */}
                {/* <div className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background">
                  <IonIcon
                    className="text-xl shrink-0"
                    icon={notificationsOffOutline}
                  />{' '}
                  Mute Notification{' '}
                </div> */}
                {/* <div className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background">
                  <IonIcon
                    className="text-xl shrink-0"
                    icon={flagOutline}
                  />{' '}
                  Report this post{' '}
                </div> */}
                {/* <div className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background">
                  {' '}
                  <IonIcon
                    className="text-xl shrink-0"
                    icon={shareOutline}
                  />{' '}
                  Share your profile{' '}
                </div> */}

                {/* {post?.post_type === 'team' ? (
                  <button>
                    <Follow
                      username={post.username}
                      type={post.post_type}
                      user={user}
                    />
                  </button>
                ) : post?.post_type === 'tour' ? (
                  <button>
                    <Follow
                      username={post.username}
                      type={post.post_type}
                      user={user}
                    />
                  </button>
                ) : post?.post_type === 'brand' ? (
                  <button>
                    <Follow
                      username={post.username}
                      type={post.post_type}
                      user={user}
                    />
                  </button>
                ) : isLoggedInUser === false ? (
                  <div
                    className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background"
                    onClick={() => followhandlesubmit(post.user._id)}
                  >
                    {
                      <div
                        className={`flex justify-center items-center text-${isFollowing ? 'red-500' : 'primary1'
                          }`}
                      >
                        <IonIcon
                          className="text-xl shrink-0"
                          icon={
                            isFollowing ? stopCircleOutline : personAddOutline
                          }
                        />
                        <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                      </div>
                    }
                  </div>
                ) : null} */}

                <CustomPost post={post} user={user} />

                {/* <div className="flex justify-center items-center h-10 p-2 w-full rounded-lg text-red-500 hover:bg-background">
                  {' '}
                  <IonIcon
                    className="text-xl shrink-0"
                    icon={stopCircleOutline}
                  />{' '}
                  Unfollow{' '}
                </div> */}
              </nav>
            </div>
          </div>
        </div>

        {/* <!-- post image --> */}
        <div>
          {post?.images.toString().length === 0 ? (
            <div className="flex items-start justify-start p-4">
              <p className="text-lg">{post.description}</p>{' '}
              {/* post without image*/}
            </div>
          ) : (
            <>
              {post.images.toString().length === 0 ? null : (
                <div className="flex items-center justify-start px-4 mb-1">
                  <p className="text-lg">{post.description}</p>
                </div>
              )}
              <a
                href=""
                uk-toggle
                onClick={(e) => {
                  e.preventDefault();
                  setA([{ src: post.images[0], alt: 'post image' }]);

                  console.log(a, 'inside a tag');
                  setOpen((state) => !state);
                }}
              >
                <div className="relative w-full lg:h-full h-full sm:px-4 aspect-video">
                  <img
                    src={post.images}
                    alt=""
                    className="sm:rounded-lg w-full h-full object-cover"
                  />
                </div>
              </a>
            </>
          )}
        </div>

        {/* <!-- post icons --> */}
        <div className="sm:p-4 p-2.5 flex justify-center items-center gap-4 text-xs font-semibold">
          <div>
            <div className="flex items-center justify-center gap-2.5">
              <NewLikePost postId={post._id} post={post} isLiked={isLiked} />
              {/* <button
                type="button"
                className={`button-icon flex items-center justify-center rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700 ${
                  isLiked ? 'text-primary1 bg-background' : 'text-white'
                }`}
              >
                <IonIcon className="text-2xl" icon={heart} />
              </button> */}
              {/* <span className=" -m-1.5 mr-2">{post.likes.length}</span> */}
            </div>
            {/* <div
              className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] text-2xl hidden"
                uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left"
            >
              <div
                className="flex gap-2"
                uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
              >
                <button
                  type="button"
                  className="text-red-600 hover:scale-125 duration-300"
                >
                  {' '}
                  <span> 👍 </span>
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:scale-125 duration-300"
                >
                  {' '}
                  <span> ❤️ </span>
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:scale-125 duration-300"
                >
                  {' '}
                  <span> 😂 </span>
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:scale-125 duration-300"
                >
                  {' '}
                  <span> 😯 </span>
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:scale-125 duration-300"
                >
                  {' '}
                  <span> 😢 </span>
                </button>
              </div>

              <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden"></div>
            </div> */}
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="button-icon flex items-center justify-center rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700"
            >
              <IonIcon className="text-2xl" icon={chatbubbleEllipses} />
            </button>
            <span className=" m-1">{comments?.length}</span>
          </div>
          {/* <button
            type="button"
            className="button-icon flex items-center justify-center ml-auto rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700"
          >
            <IonIcon className="text-xl" icon={paperPlaneOutline} />
          </button> */}
          <div className=" ml-auto ">
            <NewSharePost postId={post._id} isShared={isShared} />
          </div>

          <CopyToClipboard onCopy={onCopy} text={`${shareUrl}/${post._id}`}>
            <button
              type="button"
              className="button-icon flex items-center justify-center rounded-full p-2 hover:bg-slate-700 dark:hover:bg-slate-700"
            >
              <IonIcon className="text-xl" icon={shareOutline} />
            </button>
          </CopyToClipboard>
        </div>

        {/* <!-- comments --> */}
        {/* <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
          <div className="flex items-start gap-3 relative">
            <a href="#">
              <img
                src="assets/images/avatars/avatar-2.jpg"
                alt=""
                className="w-6 h-6 mt-1 rounded-full"
              />
            </a>
            <div className="flex-1">
              <a
                href="#"
                className="text-black font-medium inline-block dark:text-white"
              >
                Steeve
              </a>
              <p className="mt-0.5">What a beautiful photo! I love it. 😍 </p>
            </div>
          </div>

          <div className="flex items-start gap-3 relative">
            <a href="#">
              <img
                src="assets/images/avatars/avatar-3.jpg"
                alt=""
                className="w-6 h-6 mt-1 rounded-full"
              />
            </a>
            <div className="flex-1">
              <a
                href="#"
                className="text-black font-medium inline-block dark:text-white"
              >
                Monroe
              </a>
              <p className="mt-0.5">You captured the moment.😎 </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2"
          >
            <IonIcon
              icon={chevronDownOutline}
              className="ml-auto duration-200 group-aria-expanded:rotate-180"
            />
            More Comment
          </button>
        </div> */}

        {/* <!-- add comment --> */}
        {/* <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex justify-center items-center gap-3 dark:border-slate-700/40 mb-3">
          <img
            src={user?.profilePicUrl}
            alt="user pic"
            className="w-8 h-8 rounded-full"
          />

          <div className="flex-1 relative overflow-hidden h-13 ">
            <textarea
              placeholder="Add Comment...."
              rows="1"
              className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
            ></textarea>

            <div
              className="!top-2 pr-2"
              uk-drop="pos: bottom-right; mode: click"
            >
              <div
                className="flex items-center gap-2"
                uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 fill-sky-600"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 fill-pink-600"
                >
                  <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="text-sm rounded-full py-1.5 px-3.5 bg-secondery  focus:bg-primary focus:text-black focus:outline-none my-1.5"
          >
            {' '}
            Send
          </button>
        </div> */}
        <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100  gap-3 dark:border-slate-700/40 mb-3">
          <NewCommentForm post={post} user={user} />
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom, Counter, Thumbnails]}
        slides={[a[0]]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        slideshow={{ ref: slideshowRef }}
        thumbnails={{ ref: thumbnailsRef }}
        on={{
          click: () => {
            (slideshowRef.current?.playing
              ? slideshowRef.current?.pause
              : slideshowRef.current?.play)?.();
          },
          click: () => {
            (thumbnailsRef.current?.visible
              ? thumbnailsRef.current?.hide
              : thumbnailsRef.current?.show)?.();
          }
        }}
      />
    </>
  );
};

export default NewPost;
