import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ImageDropzone from '@components/common/ImageDropzone';
import Moment from 'moment';
import AddImage from '../common/AddImage';

const TournamentPhotos = ({ user, tournament, isUser, isSupportAdmin }) => {
  return (
    <div className="gallery_box">
      {isUser || isSupportAdmin ? (
        <>
          <div className="add_photos">
            <a href="#!" className="model_show_btn">
              <button className="btn">
                <i aria-hidden="true">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                  Photos
                </i>
              </button>
            </a>
            <div className="common_model_box">
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Add Photos</h3>
                <AddImage
                  type="TOURNAMENT"
                  typeId={tournament.tournament._id}
                />
                <div className="overlay"></div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <p></p>

      {tournament.tournament?.imagesgallery.length > 0 ? (
        tournament.tournament?.imagesgallery.map((imgg, idx) => (
          <div className="imagess_box" key={idx}>
            <div className="imagess">
              <ul>
                <li>
                  {imgg.images.map((imag, idex) => (
                    <a
                      className="fancybox"
                      href={imag.path}
                      data-fancybox-group="idex"
                      title={imag.originalname}
                      key={idex}
                    >
                      <img src={imag.path} alt={imag.originalname} />{' '}
                      {imag.length < 5 ? null : (
                        <>
                          <span className="total_images">
                            +{imgg.images.length - 4}
                          </span>
                        </>
                      )}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
            <div className="bottom_data">
              <span className="img_icon">
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </span>

              <h2>
                {imgg.title}
                <span className="update">
                  {Moment(imgg.createdAt).format('MMMM, DD, YYYY hh:mm A')}
                </span>
              </h2>
            </div>
          </div>
        ))
      ) : (
        <p>No Photo&apos;s Available</p>
      )}
    </div>
  );
};

export default TournamentPhotos;
