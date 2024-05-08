import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';

const RoomDetails = ({ data, type }) => {
  const [roomData, setRoomData] = useState({
    roomId: data.room?.roomId ? data.room.roomId : null,
    roompwd: data.room?.roompwd ? data.room.roompwd : ''
  });

  function onChange(e) {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  }

  const handleRoom = async (e, Id) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/api/${type}/room/${Id}`, roomData, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('The Room Data has been Added.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    $('a.model_close').parent().removeClass('show_model');
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);
  return (
    <>
      <a href="#!" className="model_show_btn">
        <div className="cols">
          <button className="btn">
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Details
          </button>
        </div>
      </a>

      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <h3>Add Room Details</h3>

          <form
            className="common_form"
            onSubmit={(e) => handleRoom(e, data._id)}
          >
            <div className="colm rows">
              <label>Room Id</label>
              <input
                type="text"
                placeholder="Enter Room ID"
                name="roomId"
                value={roomData.roomId}
                onChange={onChange}
              />
            </div>
            <div className="colm rows">
              <label>Room Password</label>
              <input
                type="password"
                placeholder="Enter Room Password"
                name="roompwd"
                value={roomData.roompwd}
                onChange={onChange}
              />
            </div>
            <button
              className="btn"
              // type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default RoomDetails;
