import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import AttributeCard from '../common/AttributeCard';
import RecruitEdit from '../profile/RecruitEdit';

const TeamGameDetails = ({
  user,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const [attributeData, setAttributeData] = useState([]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/attribute/TEAM/${team._id}`)
      .then((res) => setAttributeData(res.data));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/attribute/${attributeData?._id}`);
      toast.success('Deleted Card Successfully');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error Deleting the Card');
    }
    refreshData();
  };

  return (
    <>
      {Object.keys(attributeData).length === 0 ? null : (
        <div className="games_details">
          <ul>
            <li>
              <span className="nm">Game: </span>{' '}
              {attributeData.games?.map((game,i) => (
                <img key={i}
                  src={game.gameId?.imgUrl}
                  style={{ height: '35px', width: '35px' }}
                />
              ))}
            </li>
            <li>
              <span className="nm">Roles: </span>{' '}
              <span className="task">{attributeData.role}</span>
            </li>
            <li>
              <span className="nm">Mic:</span>{' '}
              <span className="task">
                {attributeData.mic === true ? 'On' : 'Off'}
              </span>
            </li>
            <li>
              <span className="nm">Platform:</span>{' '}
              <span className="task">{attributeData.platform}</span>
            </li>
            <li>
              <span className="nm">Language:</span>{' '}
              <span className="task">
                {attributeData.language.map((lang) => lang.slice(0, 3))}
              </span>
            </li>
            <li>
              <span className="nm">Win rate/KDA:</span>{' '}
              <span className="task"> -- </span>
            </li>
            <li>
              <span className="nm">MMR:</span>{' '}
              <span className="task"> -- </span>
            </li>
            {/* <li>
              <span className="nm">Availablilty:</span>{' '}
              <span className="task"> 4 hours per day 7 days a week </span>
            </li> */}
          </ul>
          {/* <div className="chart_box">
            <img src="/assets/media/profilechart.jpg" alt="" />
          </div> */}
          {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          ) : null}
          {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
            <RecruitEdit attributeData={attributeData} />
          ) : null}
          {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? null : (
            <button className="game_btn">INVITE TO TEAM</button>
          )}
        </div>
      )}
      {attributeData?.attributeId == team._id ? null : (
        <>
          {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
            <AttributeCard type="TEAM" attributeId={team._id} user={user} />
          ) : null}
        </>
      )}
    </>
  );
};

export default TeamGameDetails;
