import TeamSquadAdd from './TeamSquadAdd';
import TeamSquadDelete from './TeamSquadDelete';
import TeamSquadEdit from './TeamSquadEdit';

const TeamSquads = ({
  squadsData,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  console.log("Squade data new :",squadsData);
  return (
    <>
      <TeamSquadAdd
        teamplayers={squadsData.players}
        team={team}
        isManager={isManager}
        isAdmin={isAdmin}
        isOwner={isOwner}
        isCEO={isCEO}
        isSupportAdmin={isSupportAdmin}
      />
      <div className="squads_box">
        <ul>
          {!squadsData.squads || squadsData.squads.length === 0 ? (
            <li>
              <div className="dp">No Squads defined..</div>
            </li>
          ) : (
            squadsData.type === 'SQUADS' &&
            squadsData.squads.map((squad, idx) => (
              <li className="squads" key={idx}>
                <div className="edit_delet">
                  <TeamSquadEdit
                    squad={squad}
                    isManager={isManager}
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                    isCEO={isCEO}
                    isSupportAdmin={isSupportAdmin}
                  />
                  <TeamSquadDelete
                    squad={squad}
                    isManager={isManager}
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                    isCEO={isCEO}
                    isSupportAdmin={isSupportAdmin}
                  />
                </div>
                <div className="squad_img">
                  {' '}
                  <img src={squad.game?.imgUrl} className="squad_bg" alt="" />
                  <h2>{squad.game?.name}</h2>
                  <div className="plyars">
                    {' '}
                    {squad.players.map((player, idpx) => (
                      <a href="#" key={idpx}>
                        <img src={player.player?.imgUrl} alt="" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="squad_btn">
                  {' '}
                  <span className="cuntry_name">{squad.country}</span>{' '}
                  <a href="#!" className="view">
                    VIEW TEAM{' '}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>{' '}
                </div>
                <div className="squads_details">
                  {' '}
                  <a href="#!" className="squads_close">
                    X
                  </a>
                  <div className="banner">
                    {' '}
                    <img src={squad.game?.imgUrl} alt="" />
                    <h2>{squad.game?.name}</h2>
                  </div>
                  <table className="table">
                    <thead className="dark-light">
                      <tr>
                        <th scope="col">player</th>
                        <th scope="col">nickname</th>
                        <th scope="col">role</th>
                        <th scope="col">term</th>
                        <th scope="col"> win-loss</th>
                        <th scope="col">kda</th>
                        <th scope="col"> win%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {squad.players.map((player, idpx) => (
                        <tr key={idpx}>
                          <td>
                            <span className="user">
                              <img
                                src={player.playerId?.user?.profilePicUrl}
                                alt=""
                              />
                            </span>
                          </td>
                          <td>
                            <h3>{player.playerId?.slug}</h3>
                            <p>{player.playerId?.user?.name}</p>
                            <a href="#">player profile </a>
                          </td>
                          <td>Ak</td>
                          <td>2011-2014</td>
                          <td>81/89</td>
                          <td>4.1</td>
                          <td>81%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default TeamSquads;
