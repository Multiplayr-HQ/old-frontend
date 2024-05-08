import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';


const GameCommunities = ({ user, game }) => {

  return (

  	 <ul className="communities">
    	 <li>
      <div className="activity_tag">
        <span className="act_name">Communities | Coming soon ...</span>
      </div>

       <p> Our team is burning more midnight oil to add interesting features for our esports enthusiasts. Appreciate your patience and support. </p>

      </li>


{/*}
              <li>
                <div className="imgs">
                  {' '}
                  <img src="/assets/media/user.jpg" alt="comm" />{' '}
                </div>
                <div className="bottom_data">
                  <h3>
                    Bandle City{' '}
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                  </h3>
                  <p className="member">853K members</p>
                </div>
              </li>
  */}            

    </ul>



  );
};

export default GameCommunities;
