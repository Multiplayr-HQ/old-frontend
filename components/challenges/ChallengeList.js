import ChallengeApprove from '../discover/invites/ChallengeApprove';
import ChallengeDecline from '../discover/invites/ChallengeDecline';

const Challengelist = ({ profile, result, user }) => {
  const isInvite =
    profile.playergames.filter((pro) => {
      return result.invites.some((chall) => {
        return pro.player?._id === chall.playerId?._id;
      });
    }).length > 0;

  return (
    <div className="activity_tag">
      {' '}
      <a href="#">
        <span className="act_name">
          {result.User_team?.name} has challenged you for a{result.game?.name}{' '}
          match
        </span>
      </a>
      {isInvite === true ? (
        <>
          <ChallengeApprove
            challenge={result}
            user={user}
            team={result.User_team}
          />
          <ChallengeDecline challenge={result} user={user} />
        </>
      ) : (
        <button className="btn">
          <a href={`join/${result._id}`}>Go to Lobby</a>
        </button>
      )}
    </div>
  );
};

export default Challengelist;
