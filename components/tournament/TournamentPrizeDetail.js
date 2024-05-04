const TournamentPrizeDetail = () => {

  const tournament = {
    prizes: [
      {
        place: 1,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        trophy_img: "/assets/trophy.png",
        winnings: "$1000",
        goodies: "Gift basket",
        prize_sponsor: {
          name: "Sponsor A",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 2,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        trophy_img: "/assets/trophy.png",
        winnings: "$500",
        goodies: "T-shirt",
        prize_sponsor: {
          name: "Sponsor B",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 3,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        trophy_img: "/assets/trophy.png",
        winnings: "$250",
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 4,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        winnings: "$100",
        goodies: "Keychain",
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 5,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        winnings: "$50",
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 6,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        winnings: "$50", 
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 7,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        winnings: "$50",
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
      {
        place: 8,
        winner_img: "https://static.vecteezy.com/system/resources/previews/012/325/294/non_2x/crown-king-gaming-logo-isolated-on-dark-background-for-team-game-esport-vector.jpg",
        winnings: "$50",
        goodies: "Cap",
        prize_sponsor: {
          name: "Sponsor C",
          imgUrl: "/assets/media/default/team.jpg"
        }
      },
    ]
  };
  
  <TournamentPrizeDetail tournament={tournament} />
  

  return (
    <>
      <div className="new_result">
        <div className="top_three_prize">
          {tournament &&
            tournament.prizes.slice(0, 3).map((tourPrize,i) => (
              <div className="prize_box" key={i}>
                <div className="first_symb">
                  {tourPrize.place ? (
                    <>
                     
                      <img src={tourPrize?.winner_img} alt={tourPrize?.place} />
                      <p>{tourPrize?.place}</p>
                    </>
                  ) : (
                    'No place Assigned'
                  )}
                </div>
                <div className="prize_money">
                  {tourPrize.trophy_img ? (
                    <img src={tourPrize?.trophy_img} alt={tourPrize?.place} />
                  ) : (
                    'No Image'
                  )}
                  <div className="money">
                    {tourPrize.winnings ? (
                      <>{tourPrize?.winnings}</>
                    ) : (
                      'No Prize Yet'
                    )}
                    <span>+</span>
                    {tourPrize.goodies ? (
                      <>
                        <p>{tourPrize?.goodies}</p>
                      </>
                    ) : (
                      'No Goodies Yet'
                    )}
                  </div>
                </div>
                <div className="prize_foot">
                  {tourPrize.prize_sponsor.name.length > 0 ? (
                    <>
                      Prizes sponsered by{' '}
                      <img
                        src={tourPrize?.prize_sponsor?.imgUrl}
                        alt={tourPrize?.prize_sponsor?.name}
                      />
                    </>
                  ) : (
                    'No Sponsors Yet'
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="more_prizes">
          {tournament &&
            tournament.prizes.slice(3).map((tourPrize,i) => (
              <div className="prize_box" key={i}>
                <div className="first_symb">
                  {tourPrize.place ? (
                    <>
                     
                      <img src={tourPrize?.winner_img} alt={tourPrize?.place} />
                      {tourPrize?.place}
                    </>
                  ) : (
                    'No place Assigned'
                  )}
                </div>
                <div className="prize_money">
                  <div className="money">
                    {tourPrize.winnings ? (
                      <>{tourPrize?.winnings}</>
                    ) : (
                      'No Prize Yet'
                    )}
                    <span>+</span>
                    {tourPrize.goodies ? (
                      <>
                        <p>{tourPrize?.goodies}</p>
                      </>
                    ) : (
                      'No Goodies Yet'
                    )}
                  </div>
                </div>
                <div className="prize_foot">
                  {tourPrize.prize_sponsor?.name.length > 0 ? (
                    <>
                      Prizes sponsered by{' '}
                      <img
                        src={tourPrize?.prize_sponsor?.imgUrl}
                        alt={tourPrize?.prize_sponsor?.name}
                      />
                    </>
                  ) : (
                    'No Sponsors Yet'
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TournamentPrizeDetail;
