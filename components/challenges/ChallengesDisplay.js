import React from 'react';
import Moment from 'moment';
import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';
import OpenChallengeApprove from '../discover/invites/OpenChallengeApprove';
import RoomDetails from '../adminfiles/RoomDetails';

const ChallengesDisplay = ({ chall, user, profile, type }) => {
  const isInvite = profile.playergames.some((pro) =>
    chall.invites.some((chall) => pro.player?._id === chall.playerId?._id)
  );

  const isPlayer = chall.players.some((ply) =>
    profile.playergames.some((pro) => pro.player?._id === ply.playerId?._id)
  );

  return (
    <li>
      <div className="row1">
        {chall.ChallType === 'Team' && (
          <div className="card_img">
            <div className="img">
              <img src={chall.User_team?.imgUrl} alt="" />
            </div>
            {chall.User_team?.name}
          </div>
        )}

        {chall.ChallType === 'Solo' &&
          chall.players &&
          chall.players.slice(0, 1).map((ply, i) => (
            <div className="card_img" key={i}>
              <div className="img">
                <img
                  src={
                    ply?.playerId?.apidata?.data?.platformInfo?.avatarUrl ||
                    ply?.playerId?.imgUrl
                  }
                  alt={
                    ply?.playerId?.apidata?.data?.platformInfo
                      ?.platformUserHandle
                  }
                />
              </div>
              {ply?.playerId?.apidata?.data?.platformInfo?.platformUserHandle ||
                ply?.playerId?.name}
            </div>
          ))}

        <img
          src={chall?.game?.imgUrl}
          alt={chall?.game?.name}
          style={{ height: '30px', width: '30px' }}
        />
      </div>

      <div className="row1">
        <span>
          <b>Type:</b>
          {chall?.challengeType}
        </span>
        <span>
          <b>Format:</b>
          {chall.format || '---'}
        </span>
        <span>
          <b>Entry Fee:</b>
          {chall.entry_fee || '---'}
        </span>
      </div>

      <div className="row1">
        <span>
          <b>Challenge Express:</b>
          {Moment(chall?.startDate).format('DD MMM YYYY')}-{chall?.startTime}
        </span>

        {type === 'SupportAdmin' && (
          <RoomDetails data={chall} type="challenges" />
        )}

        {chall.isOpenMatch === false ? (
          isInvite ? (
            <>
              <ChallengeApprove
                challenge={chall}
                team={chall.opponent_team}
                user={user}
              />
              <ChallengeDecline challenge={chall} user={user} />
            </>
          ) : (
            <button className="btn">
              <a href={`join/${chall._id}`}>Go to Lobby</a>
            </button>
          )
        ) : !isPlayer ? (
          <OpenChallengeApprove profile={profile} challenge={chall} />
        ) : (
          <button className="btn">
            <a href={`join/${chall._id}`}>Go to Lobby</a>
          </button>
        )}
      </div>
    </li>
  );
};

export default ChallengesDisplay;

// import React from 'react';
// import Moment from 'moment';
// import ChallengeApprove from '../discover/invites/ChallengeApprove';
// import ChallengeDecline from '../discover/invites/ChallengeDecline';
// import OpenChallengeApprove from '../discover/invites/OpenChallengeApprove';
// import RoomDetails from '../adminfiles/RoomDetails';

// const ChallengesDisplay = ({ chall, user, profile, type }) => {
//   const isInvite =
//     profile.playergames.filter((pro) => {
//       return chall.invites.some((chall) => {
//         return pro.player?._id === chall.playerId?._id;
//       });
//     }).length > 0;

//   const IsPlayer =
//     chall.players.filter((ply) => {
//       return profile.playergames.some((pro) => {
//         return pro.player?._id === ply.playerId?._id;
//       });
//     }).length > 0;

//   return (
//     <>
//       <li>
//         <div className="row1">
//           {chall.ChallType === 'Team' ? (
//             <div className="card_img">
//               <div className="img">
//                 <img src={chall.User_team?.imgUrl} alt="" />
//               </div>
//               {chall.User_team?.name}
//             </div>
//           ) : chall.ChallType === 'Solo' ? (
//             chall.players &&
//             chall.players.slice(0, 1).map((ply,i) => (
//               <div className="card_img" key={i}>
//                 <div className="img">
//                   <img
//                     src={
//                       ply?.playerId?.apidata?.data?.platformInfo?.avatarUrl
//                         ? ply?.playerId?.apidata?.data?.platformInfo?.avatarUrl
//                         : ply?.playerId?.imgUrl
//                     }
//                     alt={
//                       ply?.playerId?.apidata?.data?.platformInfo?.platformUserHandle
//                     }
//                   />
//                 </div>
//                 {ply?.playerId?.apidata?.data?.platformInfo?.platformUserHandle
//                   ? ply?.playerId?.apidata?.data?.platformInfo?.platformUserHandle
//                   : ply?.playerId?.name}
//               </div>
//             ))
//           ) : null}
//           <img
//             src={chall?.game?.imgUrl}
//             alt={chall?.game?.name}
//             style={{ height: '30px', width: '30px' }}
//           />
//         </div>

//         <div className="row1">
//           <span>
//             <b>Type:</b>
//             {chall?.challengeType}
//           </span>
//           <span>
//             <b>Format:</b>
//             {chall.format ? chall.format : '---'}
//           </span>
//           <span>
//             <b>Entry Fee:</b>
//             {chall.entry_fee ? chall.entry_fee : '---'}
//           </span>
//         </div>

//         <div className="row1">
//           <span>
//             <b>Challenge Express:</b>
//             {Moment(chall?.startDate).format('DD MMM YYYY')}-{chall?.startTime}
//           </span>

//           {type === 'SupportAdmin' ? (
//             <RoomDetails data={chall} type="challenges" />
//           ) : chall.isOpenMatch === false ? (
//             isInvite === true ? (
//               <>
//                 <ChallengeApprove
//                   challenge={chall}
//                   team={chall.opponent_team}
//                   user={user}
//                 />
//                 <ChallengeDecline challenge={chall} user={user} />
//               </>
//             ) : (
//               <button className="btn">
//                 <a href={`join/${chall._id}`}>Go to Lobby</a>
//               </button>
//             )
//           ) : IsPlayer === false ? (
//             <OpenChallengeApprove profile={profile} challenge={chall} />
//           ) : (
//             <button className="btn">
//               <a href={`join/${chall._id}`}>Go to Lobby</a>
//             </button>
//           )}
//         </div>
//       </li>
//     </>
//   );
// };

// export default ChallengesDisplay;
