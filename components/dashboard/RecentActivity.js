import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';

const RecentActivity = ({ user }) => {
  // const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/chats/user/chats/latestactivity/${user.email}`)
      .then((res) => {
        // setRecent(res.data);
      });
  }, []);



  // Sample data for recent activity
// const recentActivityData = [
//   {
//     title: 'Chat with Team A',
//     last_message: {
//       text: 'Hey, how are you?',
//       timestamp: '2024-02-10T10:30:00Z', // Replace with an actual timestamp
//     },
//   },
//   {
//     title: 'Chat with Friend B',
//     last_message: {
//       text: 'Let\'s plan for the weekend!',
//       timestamp: '2024-02-11T15:45:00Z', // Replace with an actual timestamp
//     },
//   },{
//     title: 'Chat with Friend B',
//     last_message: {
//       text: 'Let\'s plan for the weekend!',
//       timestamp: '2024-02-11T15:45:00Z', // Replace with an actual timestamp
//     },
//   }
//   // Add more objects for additional recent activity
// ];

// // Simulating the response structure from the API
// const  recent = {
//   data: recentActivityData,
// }

// export default recentActivity;


  return (
    <div className="recent_activity">
      <h2>RECENT ACTIVITY</h2>
      <a href="#!" className="hideShow">
        Hide <i className="fa fa-angle-down" aria-hidden="true"></i>{' '}
        <i className="fa fa-angle-up" aria-hidden="true"></i>
      </a>
      <div className="white_box">
        {!recent || recent.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No recent activity found.</span>
          </div>
        ) : (
          recent.data.map((result, idx) => (
            <div className="activity_tag" key={idx}>
              {' '}
              <a href="#">
                {' '}
                <span className="act_img">
                  <img src="/assets/media/dash/user1.png" alt="" />
                </span>{' '}
                <span className="act_name">
                  {result.title} : {result.last_message.text}{' '}
                </span>{' '}
              </a>{' '}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
