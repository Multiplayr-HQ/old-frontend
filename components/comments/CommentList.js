import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { formatDistanceToNowStrict } from 'date-fns';
import LikeComment from './LikeComment';
import DeleteComment from './DeleteComment';
import ReplyComment from './replies/ReplyComment';
import ReplyList from './replies/ReplyList';
import PinnedComments from './PinnedComments';
import ReportsComments from './report';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import dynamic from 'next/dynamic';
// import { IonIcon } from '@ionic/react';
const IonIcon = dynamic(
  () => import('@ionic/react').then((module) => module.IonIcon),
  { ssr: false }
);

const CommentList = ({ post, user, comments }) => {
  const postId = post._id;
  const [value, setValue] = useState({ type: 'All Comments' });
  let n = 1;
  const [commentsData, setCommentsData] = useState([]);
  const [next, setNext] = useState(n);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/comments/commentData/${post._id}/${value.type}`
        );
        setCommentsData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [post._id, value]);

  const handleMoreImage = () => {
    n=2
    setNext(next + n);
  };

  const handleCollapse = () => {
    setNext(n);
  };

  const handleChangeCheck = (e) => {
    setValue({ type: e.target.value });
  };

  const renderComment = (comment) => (
    <>
      {/* <div key={comment._id} className="single_comment_sec">
        <div className="comments_point">
          <div className="comment_round_box">
            <div className="user">
              <img src={comment.user?.profilePicUrl} alt="" />
            </div>
            <div className="create">
              <a href={`/user/${comment?.user?.username}`} className="">
                {comment.user != null ? comment.user?.name : 'NOT DEFINED'}
              </a>{' '}
              <h3>{comment.text}</h3>
            </div>
            <PinnedComments user={user} comment={comment} post={post} />
          </div>
          <LikeComment postId={postId} comment={comment} />
        </div>
        <div className="time_del_rep">
          <span className="days">
            {formatDistanceToNowStrict(new Date(comment.date), {
              addSuffix: true
            })}
          </span>
          <div className="first_reply">
            <DeleteComment post={post} comment={comment} user={user} />
            <ReplyComment post={post} comment={comment} />
          </div>
        </div>
        <ReplyList post={post} comment={comment} user={user} />
      </div> */}

      <div className="sm:p-4 p-2.5 border-t border-gray-100 text-md space-y-3 relative dark:border-slate-700/40">
        <div className="flex justify-start items-center gap-3 relative px-3 py-1 rounded-lg hover:bg-background  transform transition-all delay-150 ease-out">
          <div>
            <img
              src={comment.user?.profilePicUrl}
              alt="profile"
              className=" w-12 h-12 mt-1 rounded-full border-black border-2"
            />
          </div>

          <div className="flex flex-col items-start">
            <a
              href={`/user/${comment?.user?.username}`}
              className="text-white font-medium inline-block dark:text-white capitalize"
            >
              {comment.user != null ? comment.user?.name : 'NOT DEFINED'}
            </a>
            <span className="mt-0.5 font-normal ">{comment.text}</span>

            {/* rest of reply and like button */}

            <div className="time_del_rep ml-0">
              <span className="days">
                {formatDistanceToNowStrict(new Date(comment.date), {
                  addSuffix: true
                })}
              </span>
              <div className="first_reply">
                <DeleteComment post={post} comment={comment} user={user} />
                <ReplyComment post={post} comment={comment} />
              </div>
            </div>
          </div>

          <div>
            <LikeComment postId={postId} comment={comment} />
          </div>
          <div>
            <PinnedComments user={user} comment={comment} post={post} />
          </div>
        </div>

        <ReplyList post={post} comment={comment} user={user} />
      </div>
    </>
  );

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
            {['Popular Comments', 'Newest Comments', 'Pinned Comments'].map(
              (opt, ido) => (
                <option key={ido} value={opt}>
                  {opt}
                </option>
              )
            )}
          </select>
        </div>
        {comments?.length === 0 ? (
          <p>There are no comments for this post.</p>
        ) : (
          <>
            <div>
              {commentsData?.length === 0
                ? comments.slice(0, next).map(renderComment)
                : commentsData?.slice(0, next).map(renderComment)}
            </div>

            <div className="flex justify-start gap-5 z-20">
              {next < comments?.length ? (
                <>
                  <div
                    onClick={handleMoreImage}
                    type="button"
                    className="flex items-center gap-1.5 text-gray-500 mt-2  hover:text-blue-500  dark:hover:text-blue-500"
                  >
                    <IonIcon
                      icon={chevronDownOutline}
                      className="ml-auto duration-200 group-aria-expanded:rotate-180"
                    />
                    More Comment
                  </div>{' '}
                  {next !== n ? (
                    <div
                      onClick={handleCollapse}
                      type="button"
                      className="flex items-center gap-1.5 text-gray-500 mt-2 hover:text-blue-500  dark:hover:text-blue-500 "
                    >
                      <IonIcon
                        icon={chevronUpOutline}
                        className="ml-auto duration-200 group-aria-expanded:rotate-180"
                      />
                      Collapse
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ) : comments?.length < n ? null : (
                <div
                  onClick={handleCollapse}
                  type="button"
                  className="flex items-center gap-1.5 text-gray-500 mt-2 hover:text-blue-500  dark:hover:text-blue-500  "
                >
                  <IonIcon
                    icon={chevronUpOutline}
                    className="ml-auto duration-200 group-aria-expanded:rotate-180"
                  />
                  Collapse
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentList;

// const renderComment = (comment) => (
//   <div key={comment._id} className="single_comment_sec">
//     <div className="comments_point">
//       <div className="comment_round_box">
//         <div className="user">
//           <img src={comment.user?.profilePicUrl} alt="" />
//         </div>
//         <div className="create">
//           <a href={`/user/${comment?.user?.username}`} className="">
//             {comment.user != null ? comment.user?.name : 'NOT DEFINED'}
//           </a>{' '}
//           <h3>{comment.text}</h3>
//         </div>
//         <PinnedComments user={user} comment={comment} post={post} />
//       </div>
//         <LikeComment postId={postId} comment={comment} />
//       {/* {(post.user?._id === user._id && comment.user?._id === user._id) ||
//       comment.user?._id === user._id ? null : (
//         <ReportsComments />
//       )} */}
//     </div>
//     <div className="time_del_rep">
//       <span className="days">
//         {formatDistanceToNowStrict(new Date(comment.date), {
//           addSuffix: true
//         })}
//       </span>
//       <div className="first_reply">
//         <DeleteComment post={post} comment={comment} user={user} />
//         <ReplyComment post={post} comment={comment} />
//       </div>
//     </div>
//     <ReplyList post={post} comment={comment} user={user} />
//   </div>
// );
