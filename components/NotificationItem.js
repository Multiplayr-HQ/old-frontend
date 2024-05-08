import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import cookie from 'js-cookie';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NotificationItem = ({ user }) => {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/notifications`, {
        headers: {
          Authorization: cookie.get('token')
        }
      })
      .then((res) => {
        setNotify(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClick = async () => {
    await fetch(`${baseURL}/api/notifications`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    refreshData();
  };

  return (
    <>
      <a href="#" onClick={handleClick}>
        {' '}
        <img src="/assets/media/icons/Notification.png" alt="" />
        {user?.unreadNotification === false ? null : (
          <span className="pop">{notify.length}</span>
        )}
      </a>

      <div className="drop_down_bg bell_drop_down">
        <ul className="notif_box bellHight">
          <div>
            {!notify || notify.length === 0 ? (
              <h3 className="no_noti">No Notifications...</h3>
            ) : (
              <div>
                {' '}
                {notify &&
                  notify.map((notification, idx) => (
                    <li className="notif_tag" key={idx}>
                      {notification.type === 'comment' ? (
                        <>
                          <span className="notif_img">
                            <img src={notification.user?.profilePicUrl} />
                          </span>{' '}
                          <span className="notif_name">
                            <a
                              href={`/user/${notification.user?.username}`}
                              onClick={handleClick}
                            >
                              {notification.user?.username}
                            </a>{' '}
                            left a comment on{' '}
                            <a
                              href={`/posts/${notification.post._id}`}
                              onClick={handleClick}
                            >
                              {notification.post.description.length > 15
                                ? notification.post.description
                                    .substring(0, 15)
                                    .concat('...')
                                : notification.post.description}
                            </a>
                            {/* don't have data in text */}
                            <p>
                              {notification.text.length > 15
                                ? notification.text
                                    .substring(0, 15)
                                    .concat('...')
                                : notification.text}
                            </p>
                            <p>
                              {formatDistanceToNowStrict(
                                new Date(notification.date),
                                {
                                  addSuffix: true
                                }
                              )}
                            </p>
                          </span>
                        </>
                      ) : notification.type === 'reply' ? (
                        <>
                          <span className="notif_img">
                            <img src={notification.user?.profilePicUrl} />
                          </span>{' '}
                          <span className="notif_name">
                            <a
                              href={`/user/${notification.user?.username}`}
                              onClick={handleClick}
                            >
                              {notification.user?.username}
                            </a>{' '}
                            replied to your comment on{' '}
                            <a
                              href={`/posts/${notification.post?._id}`}
                              onClick={handleClick}
                            >
                              {notification.post?.description.length > 15
                                ? notification.post?.description
                                    .substring(0, 15)
                                    .concat('...')
                                : notification.post?.description}
                            </a>
                            {/* replies is not available */}
                            <p>
                              {notification?.text.length > 15
                                ? notification?.text
                                    .substring(0, 15)
                                    .concat('...')
                                : notification?.text}
                            </p>
                            <p>
                              {formatDistanceToNowStrict(
                                new Date(notification.date),
                                {
                                  addSuffix: true
                                }
                              )}
                            </p>
                          </span>
                        </>
                      ) : notification.type === 'follow' ? (
                        <>
                          <span className="notif_img">
                            <img src={notification.user?.profilePicUrl} />
                          </span>{' '}
                          <span className="notif_name">
                            <a
                              href={`/user/${notification.user?.username}`}
                              onClick={handleClick}
                            >
                              {notification.user?.username}
                            </a>{' '}
                            started following you
                            <p>
                              {formatDistanceToNowStrict(
                                new Date(notification.date),
                                {
                                  addSuffix: true
                                }
                              )}
                            </p>
                          </span>
                        </>
                      ) : notification.type === 'like' ? (
                        <>
                          <span className="notif_img">
                            <img src={notification.user?.profilePicUrl} />
                          </span>{' '}
                          <span className="notif_name">
                            <Link
                              href={`/user/${notification.user?.username}`}
                              onClick={handleClick}
                            >
                              <a>{notification.user?.username}</a>
                            </Link>{' '}
                            liked your post on{' '}
                            <a
                              href={`/posts/${notification.post?._id}`}
                              onClick={handleClick}
                            >
                              {notification.post?.description.length > 15
                                ? notification.post?.description
                                    .substring(0, 15)
                                    .concat('...')
                                : notification.post?.description}
                            </a>
                            <p>
                              {formatDistanceToNowStrict(
                                new Date(notification.date),
                                {
                                  addSuffix: true
                                }
                              )}
                            </p>
                          </span>
                        </>
                      ) : notification.type === 'badge' ? (
                        <>
                          <span className="notif_img">
                            <img src="" />
                          </span>{' '}
                          <span className="notif_name">
                            You have been awarded the{' '}
                            <span>
                              {/* Badge is not available */}
                              {notification.text} badge
                            </span>
                            .
                            <p>
                              {formatDistanceToNowStrict(
                                new Date(notification.date),
                                {
                                  addSuffix: true
                                }
                              )}
                            </p>
                          </span>
                        </>
                      ) : null}
                    </li>
                  ))}
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default NotificationItem;
