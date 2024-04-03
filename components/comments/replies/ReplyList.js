import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import DeleteReply from './DeleteReply';
import LikeReply from './LikeReply';
import { formatDistanceToNowStrict } from 'date-fns';
import ReportsComments from '../report';
import dynamic from 'next/dynamic';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
// import { IonIcon } from '@ionic/react';
const IonIcon = dynamic(
  () => import('@ionic/react').then((module) => module.IonIcon),
  { ssr: false }
);

const ReplyList = ({ post, comment, user }) => {
  const [replies, setReplies] = useState([]);
  const [showAllReplies, setShowAllReplies] = useState(false);

  useEffect(() => {
    fetchReplies();
  }, [showAllReplies]); // Call fetchReplies when showAllReplies changes

  const fetchReplies = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/comments/${post?._id}/${comment?._id}`
      );
      setReplies(res.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleToggleReplies = () => {
    setShowAllReplies((prevShowAllReplies) => !prevShowAllReplies);
  };

  return (
    <div className="ml-12 ">
      {replies.length === 0 ? null : (
        <div className="-mt-2 py-2 relative">
          {replies
            .slice(0, showAllReplies ? replies.length : 2)
            .map((reply) => (
              <article key={reply._id}>
                {/* <div className="reply_comment_item flex justify-start">
                  <a href={`/user/${reply.user?.name}`}>
                    <span className="avtar">
                      <img
                        src={
                          reply.user != null
                            ? reply.user?.profilePicUrl
                            : 'Not Defined'
                        }
                      />
                    </span>
                  </a>
                  <div className="comments_data flex flex-col items-start">
                    <div className="member_profile">
                      <a href={`/user/${reply?.user?.username}`}>
                        <h3>
                          {reply.user != null
                            ? reply.user?.name
                            : 'Not Defined'}
                        </h3>{' '}
                      </a>
                    </div>
                    <p>{reply.text}</p>
                  </div>
                  <LikeReply
                    postId={post._id}
                    commentId={comment._id}
                    reply={reply}
                  />
                </div> */}

                <div className=" border-t border-gray-100 text-md space-y-3 relative dark:border-slate-700/40">
                  <div className="flex justify-start items-center gap-3 relative px-3 py-1 rounded-lg hover:bg-background transform transition-all delay-150 ease-out">
                    <div>
                      <img
                        src={comment.user?.profilePicUrl}
                        alt="profile"
                        className=" w-9 h-9 mt-1 rounded-full border-black border-2"
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <a
                        href={`/user/${reply?.user?.username}`}
                        className="text-white font-medium inline-block dark:text-white capitalize"
                      >
                        {reply.user != null ? reply.user?.name : 'Not Defined'}
                      </a>
                      <span className="mt-0.5 font-normal ">{reply.text}</span>

                      {/* rest of reply and like button */}

                      <div className="time_del_rep ml-0">
                        <span className="days">
                          {formatDistanceToNowStrict(new Date(reply.date), {
                            addSuffix: true
                          })}
                        </span>
                        <div className="first_reply">
                          <DeleteReply
                            post={post}
                            comment={comment}
                            reply={reply}
                            user={user}
                          />
                          {/* <ReplyComment post={post} comment={comment} /> */}
                        </div>
                      </div>
                    </div>

                    <div>
                      <LikeReply
                        postId={post._id}
                        commentId={comment._id}
                        reply={reply}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="social_bar flex ">
                  <DeleteReply
                    post={post}
                    comment={comment}
                    reply={reply}
                    user={user}
                  />
                </div> */}
              </article>
            ))}
          {replies.length > 2 && (
            <>
              <div className="flex justify-start gap-5 z-20">
                {!showAllReplies ? (
                  <div
                    onClick={handleToggleReplies}
                    type="button"
                    className="flex items-center gap-1.5 text-gray-500 mt-2  hover:text-blue-500  dark:hover:text-blue-500"
                  >
                    <IonIcon
                      icon={chevronDownOutline}
                      className="ml-auto duration-200 group-aria-expanded:rotate-180"
                    />
                    More Replied Comments
                  </div>
                ) : (
                  <div
                    onClick={handleToggleReplies}
                    type="button"
                    className="flex items-center gap-1.5 text-gray-500 mt-2 hover:text-blue-500  hover:dark:text-blue-500 "
                  >
                    <IonIcon
                      icon={chevronUpOutline}
                      className="ml-auto duration-200 group-aria-expanded:rotate-180"
                    />
                    Collapse Replied Comments
                  </div>
                )}
              </div>

              {/* <div className="loadmore">
                <button className="" onClick={handleToggleReplies}>
                  {showAllReplies ? 'Collapse' : 'Load more replies'}{' '}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </button>
              </div> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyList;
