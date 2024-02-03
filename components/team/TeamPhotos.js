import Moment from 'moment';
import PhotosDelete from './PhotosDelete';
import AddImage from '../common/AddImage';

const TeamPhotos = ({
  user,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  return (
    <div className="gallery_box">
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
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
                <AddImage type="TEAM" typeId={team._id} />
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </>
      ) : null}

      <p></p>

      {team.imagesgallery.length > 0 ? (
        team.imagesgallery &&
        team.imagesgallery.map((imgg, idx) => (
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
                      {imgg.images.length < 5 ? null : (
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
              <PhotosDelete
                collectionId={imgg._id}
                team={team}
                isManager={isManager}
                isAdmin={isAdmin}
                isOwner={isOwner}
                isCEO={isCEO}
                isSupportAdmin={isSupportAdmin}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No Photo&apos;s Available.</p>
      )}
    </div>
  );
};

export default TeamPhotos;
