import React, { useState,useRef } from 'react';
import Moment from 'moment';
import Lightbox from 'yet-another-react-lightbox';
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import ProfilePhotosDel from './ProfilePhotosDel';
import AddImage from '../common/AddImage';

const Photos = ({ Userdata, user, photosData }) => {
  const [open, setOpen] = useState(false);
  const slideshowRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const [srcData, setSrcData] = useState([]);
  let a=[];

  return (
    <div className="tab hide" id="photos">
      <div className="gallery_box">
        {Userdata.user._id === user._id ? (
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
                  <AddImage type="PROFILE" typeId={Userdata.user._id} />
                </div>
                <div className="overlay"></div>
              </div>
            </div>
          </>
        ) : null}

        <p></p>

        {photosData && photosData.length === 0 ? (
          <p>No photosData</p>
        ) : (
          photosData &&
          photosData.map((imgg, idx) =>{ 
            {/* let a=[{src:"image.jpg",alt :"img"}]; */}
            return (
            <div className="imagess_box z-50" key={idx} onClick={ () => {  }}>
              <div className="imagess">
                <ul>
                  <li>
                    {imgg.images &&
                      imgg.images.map((imag, idex) => {
                        
                        a.push({src:imag.path, alt:imag.originalname});
                        console.log(a ,"inside photos")

                        return (
                          <a
                            className="fancybox"
                            onClick={() => setOpen(true)}
                            data-fancybox-group={idex}
                            title={imag.originalname}
                            key={idex}
                          >
                            <img
                              src={imag.path}
                              alt={imag.originalname}
                              style={{ width: '100%', height: '300px' }}
                            />
                            {imag.length < 5 ? null : (
                              <>
                                {imgg.images.length > 4 && (
                                  <span className="total_images">
                                    +{imgg.images.length - 4}
                                  </span>
                                )}
                              </>
                            )}
                          </a>
                        );
                      })}
                  </li>
                </ul>
              </div>
              <div className="bottom_data">
                <span className="img_icon">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>

                <h2
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {imgg.title.length >= 15
                    ? imgg.title.slice(0, 15) + ' ...'
                    : imgg.title}
                  <span className="update">
                    {Moment(imgg.createdAt).format('MMMM, DD, YYYY hh:mm A')}
                  </span>
                </h2>
                <ProfilePhotosDel
                  collectionId={imgg._id}
                  profile={Userdata}
                  user={user}
                />
              </div>
            </div>
        )})
        )}
      </div>

      {/* <button type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button> */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom,Slideshow,Counter,Thumbnails]}
        slides={[...a]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        slideshow={{ ref: slideshowRef }}
        thumbnails={{ ref: thumbnailsRef }}
        on={{
        click: () => {
        (slideshowRef.current?.playing
          ? slideshowRef.current?.pause
          : slideshowRef.current?.play)?.();
      },
      click: () => {
        (thumbnailsRef.current?.visible
          ? thumbnailsRef.current?.hide
          : thumbnailsRef.current?.show)?.();
      },
    }}
      />
    </div>
  );
};

export default Photos;
