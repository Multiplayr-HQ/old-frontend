import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateCal = ({ gameId }) => {
  const [startDate1, setStartDate] = useState(new Date());
  const [endDate1, setEndDate] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const onChange = (item) => {
    setState([item.selection]);

    if (item.selection.endDate !== item.selection.startDate) {
      console.log(item.selection.startDate);

      setStartDate(item.selection.startDate);
      setEndDate(item.selection.endDate);

      if (startDate1) {
        if (endDate1) {
          getTours(startDate1, endDate1).then((items) => {
            setTournaments(items);
          });
        }
      }
    }
  };
  function getTours(startDate, endDate) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        gameId: gameId
      })
    };
    return fetch(
      `${baseURL}/api/tournaments/tournamentsbydate`,
      requestOptions
    ).then((data) => data.json());
  }

  console.log(tournaments);

  return (
    <>
      <div className="calendar_box">
        {/* <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          monthsShown={1}
          selectsRange
          inline
          dateFormat="MMMM d, yyyy"
        /> */}

        <DateRangePicker
          onChange={onChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
          showNeighboringMonth={true}
          rangeColors={['#000', '#000', '#00000']}
        />
      </div>

      {tournaments.length === 0 ? (
        <div className="all_matches">
          <p>
            No Tournaments are scheduled between selected dates. Please change
            the dates and check again!{' '}
          </p>
        </div>
      ) : (
        tournaments.map((tour,i) => (
          <div className="all_matches" key={i}>
            <h2>{tour.name}</h2>
            <div className="match_box">
              <div className="match_table" key={tour._id}>
                <div className="head_row">
                  <div className="tm">11:00PCT</div>
                  <div className="live">
                    <b>Live</b> 25:20
                  </div>
                </div>
                <div className="data_col1">
                  <div className="top">
                    <div className="lft_dp">
                      {' '}
                      <span className="dp">
                        <img src={tour.tournament.imgUrl} alt="" />
                      </span>{' '}
                      <span className="dp_name">{tour.tournament.name}</span>{' '}
                    </div>
                    <div className="num">3</div>
                  </div>
                  <div className="top">
                    <div className="lft_dp">
                      {' '}
                      <span className="dp">
                        <img src={tour.tournament.imgUrl} alt="" />
                      </span>{' '}
                      <span className="dp_name">
                        {tour.tournament.description}
                      </span>{' '}
                    </div>
                    <div className="num">3</div>
                  </div>
                </div>
                <div className="data_col2">
                  {' '}
                  <a href="#">
                    <img src="/assets/media/calendar/stats.jpg" /> Full Match
                    Stats
                  </a>{' '}
                  <a href="#">
                    <img src="/assets/media/calendar/play.jpg" /> Watch Replay
                  </a>{' '}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};
export default DateCal;
