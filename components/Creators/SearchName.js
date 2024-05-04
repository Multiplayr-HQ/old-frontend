import React, { useEffect, useState } from 'react';
import ImageDropzone from '@components/common/ImageDropzone';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import axios from 'axios';

const SearchName = ({ data, type, handleChange, isSearchOnly, user }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [trigger, setTrigger] = useState(true);
  const [images, setImages] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchText(searchWord);
    const newFilter = data?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
      if (filteredData.length === 0 && isSearchOnly === false) {
        handleChange(event);
      }
    }
  };

  let Id = '';
  const mutation = useMutation(async (formdata) => {
    if (type === 'Team') {
      await axios.post(
        `${baseURL}/api/admin/team/${Id}/${user._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
    } else if (type === 'Tournament') {
      await axios.post(
        `${baseURL}/api/admin/tournament/${Id}/${user._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
    } else if (type === 'Brand') {
      await axios.post(
        `${baseURL}/api/admin/brand/${Id}/${user._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
    }
  });

  const handleClaim = async (e, data) => {
    e.preventDefault();
    Id = data._id;
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    try {
      await mutation.mutateAsync(formdata);
      $('a.model_close').parent().removeClass('show_model');
      toast.success('User images have been updated');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please upload your images again');
    }
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  return (
    <>
      <div className="form-group">
        {isSearchOnly === false && (
          <label htmlFor="exampleFormControlInput1">{type} Name</label>
        )}
        <input
          type="search"
          name="name"
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
          style={{ color: 'whitesmoke !important' }}
        />
         <input type="submit" />

        {searchText.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <>
                <div className="custom-rig-tag">
                  <div className="rigs_items">
                    {!filteredData || filteredData.length === 0 ? (
                      <p>
                        No {type === 'ORGANIZER' ? 'Organizer' : 'Sponsor'}{' '}
                        found..
                      </p>
                    ) : (
                      filteredData.map((data) => (
                        <div key={data._id} className="items">
                          <span>
                            {data.imgUrl ? (
                              <img src={data?.imgUrl} height={50} width={50} />
                            ) : (
                              <img src={data?.logoUrl} height={50} width={50} />
                            )}
                          </span>
                          <a
                            href={`/${
                              type === 'Team'
                                ? 'team'
                                : `${type === 'Brand' ? 'brand' : 'tour'}`
                            }/${
                              type === 'Tournament'
                                ? `${data.name}`
                                : `${data._id}`
                            }`}
                          >
                            {data.name.length > 20
                              ? data.name.substring(0, 20) + '...'
                              : data.name}
                          </a>
                          <div className="loc_box edit_pof">
                            <a
                              href="javascript:void(0);"
                              className="model_show_btn"
                              onClick={() => setTrigger(!trigger)}
                            >
                              Claim
                            </a>
                            <div
                              className="common_model_box edit_profile"
                              id="big_poup"
                            >
                              <a href="#!" className="model_close">
                                X
                              </a>
                              <div className="inner_model_box">
                                <div className="add_job_height">
                                  <h3>Claim {data.name}</h3>
                                </div>
                                <div className="gallery_box claim-gallery">
                                  <ImageDropzone setImages={setImages} />
                                </div>
                                <div className="upload_btn">
                                  <button
                                    onClick={(e) => handleClaim(e, data)}
                                    className="btn"
                                  >
                                    UPLOAD NOW
                                  </button>
                                </div>
                              </div>
                              <div className="overlay"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default SearchName;
