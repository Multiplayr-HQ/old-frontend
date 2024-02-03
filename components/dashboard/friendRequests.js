import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useForm } from "react-hook-form";


const FriendRequests = ({user}) => { 

  const [senderId, setSenderId] = useState('');
  const [senderName, setSenderName] = useState('');

  const { register, handleSubmit } = useForm();

 const acceptFriend = async (
  { senderId , senderName}) => {
  try {
    
    const res = await axios.post(`${baseURL}/api/friendrequests/search`, {
      user,
      senderId,
      senderName
    });
  } catch (error) {
    console.log(error)
  }
};

 const rejectFriend = async (
  { senderId, senderName }) => {
  try {
    
    console.log('Reject');
    console.log(senderId)
    const res = await axios.post(`${baseURL}/api/friendrequests/search`, {
      user,
      senderId,
      senderName
    });
  } catch (error) {
    console.log(error)
  }
};

if (user) {

return (

  <div className="recent_activity freind_request">
    <h2>FRIEND REQUESTS</h2>
    <a href="#!" className="hideShow">Hide <i className="fa fa-angle-down" aria-hidden="true"></i> <i className="fa fa-angle-up" aria-hidden="true"></i></a>
    <div className="white_box">
  
             {!user.request || user.request.length === 0 ? (
              <div className="activity_tag">
               <span className="act_name">No new invites ...</span>
               </div>
             ) : (
               user.request.map((resultuser, idx) => (

                   <div className="activity_tag" key={idx}> 


                   <a href="#!"> <span className="act_img"><img src="/assets/media/dash/user.png" alt=""/></span> <span className="act_name">{resultuser.username.length > 12
                                     ? resultuser.username.substring(0, 12) + '...'
                       : resultuser.username}</span> 
                   </a>     
<form className="form w-100" method="POST" noValidate="novalidate" onSubmit={handleSubmit(acceptFriend)}>
                    <input type="hidden" name="senderId" {...register('senderId')} className="senderId" value={resultuser.userId}/>

                    <input type="hidden" name="senderName" {...register('senderName')} className="senderName" value={resultuser.username}/>
             
                      <button type="submit" className="btn add accept friend-add"> <span className="accept">accept</span> </button>
     </form>

<form className="form w-100" method="POST" noValidate="novalidate" onSubmit={handleSubmit(rejectFriend)}>
                      <button type="submit" className="btn add accept friend-add"> <span className="close">X</span>  </button>
                       
     </form>

                  </div>

               ))
             )}


    </div>
  </div>

  
);
} else {
  return null
}

}

export default FriendRequests;