const TournamentPrizeDetail = ({ tournament }) => {
  return (
    <>
      <div className="new_result">
        <div className="top_three_prize">
          {tournament &&
            tournament.prizes.slice(0, 3).map((tourPrize) => (
              <div className="prize_box">
                <div className="first_symb">
                  {tourPrize.place ? (
                    <>
                      {tourPrize?.place}
                      <img src={tourPrize?.winner_img} alt={tourPrize?.place} />
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
            tournament.prizes.slice(3).map((tourPrize) => (
              <div className="prize_box">
                <div className="first_symb">
                  {tourPrize.place ? (
                    <>
                      {tourPrize?.place}
                      <img src={tourPrize?.winner_img} alt={tourPrize?.place} />
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
      </div>
    </>
  );
};

export default TournamentPrizeDetail;
