import React from 'react';

const BracketSystem = ({ data }) => {
  const roundOneMatches = data?.filter((match) => {
    return match.instance === 'Round1';
  });
  const roundTwoMatches = data?.filter((match) => {
    return match.instance === 'Round2';
  });
  const SemiFinals = data?.filter((match) => {
    return match.instance === 'Semifinals';
  });
  const Finals = data?.filter((match) => {
    return match.instance === 'Final';
  });

  const middleIndex = Math.ceil(roundTwoMatches?.length / 2);

  const firstHalf = roundTwoMatches?.splice(0, middleIndex);
  const secondHalf = roundTwoMatches?.splice(-middleIndex);

  return (
    <>
      <div className="knockout_matches">
        <h2>Knowckout-Bracket</h2>
        <ul>
          <li>
            <h4>Round1</h4>
            {/* <p>April 21 18:00</p> */}
          </li>
          <li>
            <h4>Round2</h4>
            {/* <p>April 21 18:00</p> */}
          </li>
          <li>
            <h4>Semifinals</h4>
            {/* <p>April 21 18:00</p> */}
          </li>
          <li className="active">
            <h4>Final</h4>
            {/* <p>April 21 18:00</p> */}
          </li>
        </ul>
      </div>
      <div className="matches_postitions">
        <div className="section section1">
          <ul>
            {roundOneMatches &&
              roundOneMatches.map(
                (match) =>
                  match.opponents &&
                  match.opponents.map((opponent,i) => (
                    <li key={i}>
                      <div className="team_name">
                        {' '}
                        <span className="dp">
                          <img src={opponent.opponent?.image_url} alt="" />
                        </span>{' '}
                        <span className="dp_name">
                          {opponent.opponent?.name}
                          <b></b>
                        </span>{' '}
                      </div>
                      {/* <div className="points">7</div> */}
                    </li>
                  ))
              )}
          </ul>
        </div>

        <div className="section section2">
          <ul>
            {roundTwoMatches &&
              firstHalf.map((match) =>
                match.opponents && match.opponents.length === 2 ? (
                  match.opponents.map((opponent,i) => (
                    <li key={i}>
                      <div className="team_name">
                        {' '}
                        <span className="dp">
                          <img src={opponent.opponent?.image_url} alt="" />
                        </span>{' '}
                        <span className="dp_name">
                          {opponent.opponent?.name}
                          <b></b>
                        </span>{' '}
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    {match.opponents[0] ? (
                      <li>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img
                              src={match.opponents[0].opponent?.image_url}
                              alt=""
                            />
                          </span>{' '}
                          <span className="dp_name">
                            {match.opponents[0].opponent?.name}
                            <b></b>
                          </span>{' '}
                        </div>
                      </li>
                    ) : null}
                    {match.opponents[1] ? null : (
                      <li>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src="/assets/media/user.jpg" alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            ---<b></b>
                          </span>{' '}
                        </div>
                      </li>
                    )}
                  </>
                )
              )}
          </ul>

          <ul>
            {roundTwoMatches &&
              secondHalf.map((match) =>
                match.opponents && match.opponents.length === 2 ? (
                  match.opponents.map((opponent,i) => (
                    <li key={i}>
                      <div className="team_name">
                        {' '}
                        <span className="dp">
                          <img src={opponent.opponent?.image_url} alt="" />
                        </span>{' '}
                        <span className="dp_name">
                          {opponent.opponent?.name}
                          <b></b>
                        </span>{' '}
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    {match.opponents[0] ? (
                      <li>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img
                              src={match.opponents[0].opponent?.image_url}
                              alt=""
                            />
                          </span>{' '}
                          <span className="dp_name">
                            {match.opponents[0].opponent?.name}
                            <b></b>
                          </span>{' '}
                        </div>
                      </li>
                    ) : null}
                    {match.opponents[1] ? null : (
                      <li>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src="/assets/media/user.jpg" alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            ---<b></b>
                          </span>{' '}
                        </div>
                      </li>
                    )}
                  </>
                )
              )}
          </ul>
        </div>

        <div className="section section3">
          <ul>
            {SemiFinals &&
              SemiFinals.map(
                (match) =>
                  match.opponents &&
                  match.opponents.map((opponent,i) =>
                    opponent.isPlayer === false ? (
                      <li key={i}>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src="/assets/media/user.jpg" alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            {match.instance === 'Semifinals'
                              ? 'Semi-Final Player'
                              : 'Final Player'}
                            <b></b>
                          </span>{' '}
                        </div>
                        {/* <div className="points">7</div> */}
                      </li>
                    ) : (
                      <li key={i}>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src={opponent.opponent?.image_url} alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            {opponent.opponent?.name}
                            <b></b>
                          </span>{' '}
                        </div>
                        {/* <div className="points">7</div> */}
                      </li>
                    )
                  )
              )}
          </ul>
        </div>

        <div className="section section4">
          <ul>
            {Finals &&
              Finals.map(
                (match) =>
                  match.opponents &&
                  match.opponents.map((opponent,i) =>
                    opponent.isPlayer === false ? (
                      <li key={i}>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src="/assets/media/user.jpg" alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            {match.instance === 'Semifinals'
                              ? 'Semi-Final Player'
                              : 'Final Player'}
                            <b></b>
                          </span>{' '}
                        </div>
                        {/* <div className="points">7</div> */}
                      </li>
                    ) : (
                      <li key={i}>
                        <div className="team_name">
                          {' '}
                          <span className="dp">
                            <img src={opponent.opponent?.image_url} alt="" />
                          </span>{' '}
                          <span className="dp_name">
                            {opponent.opponent?.name}
                            <b></b>
                          </span>{' '}
                        </div>
                        {/* <div className="points">7</div> */}
                      </li>
                    )
                  )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BracketSystem;
