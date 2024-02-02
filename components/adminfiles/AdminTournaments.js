import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import RoomDetails from './RoomDetails';
import ReactPaginate from 'react-paginate';

const AdminTournaments = ({ tournaments, numberOfTournament }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + numberOfTournament;
    setCurrentItems(tournaments.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tournaments.length / numberOfTournament));
  }, [itemOffset, numberOfTournament]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * numberOfTournament) % tournaments.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <h2>Latest Tournaments</h2>
      <div className="table">
        <div className="heads_row">
          <div className="heads">TournamentId</div>
          <div className="heads">Name</div>
          <div className="heads">Start Date</div>
          <div className="heads">End Date</div>
          <div className="heads">Teams</div>
          <div className="heads">Platform</div>
          <div className="heads">Status</div>
          <div className="heads">Room Details</div>
          <div className="heads">Category</div>
          <div className="heads">Actions</div>
        </div>
        {!tournaments || tournaments.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No tournaments are ranked yet ...</span>
          </div>
        ) : (
          currentItems &&
          currentItems.map((result, idx) => (
            <div className="row_box" key={idx}>
              <div className="cols_box">
                <div className="cols">{result._id}</div>
                <div className="cols">{result.name}</div>
                <div className="cols">
                  {moment(result.startDate).format('DD/MM/YYYY')}{' '}
                  {result.startTime}{' '}
                </div>
                <div className="cols">
                  {moment(result.endDate).format('DD/MM/YYYY')} {result.endTime}
                </div>
                <div className="cols">Teams</div>
                <div className="cols">
                  {result.platform ? result.platform : '---'}
                </div>
                <div className="cols">
                  {result.status ? result.status : 'Null'}
                </div>
                <div className="cols">
                  Room Id: {result.room?.roomId ? result.room.roomId : '---'}
                  <br />
                  Room Password:{' '}
                  {result.room?.roompwd ? result.room.roompwd : '---'}
                </div>
                <Category data={result} />
                <RoomDetails data={result} type="tournaments" />
              </div>
            </div>
          ))
        )}
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default AdminTournaments;
