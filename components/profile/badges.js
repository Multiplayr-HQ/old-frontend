import { size } from 'lodash';
import { useEffect, useState } from 'react';
// import '@fancyapps/fancybox';

const more = { fontSize: '12px', color: '#000' };

const Badges = ({ Userdata }) => {
  useEffect(() => {
    $('a.model_show_btn').on("click",function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').on("click",function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  // useEffect(() => {
  //   $('.common_poup').fancybox({
  //     wrapCSS: 'common_poup_wrap',
  //     autoSize: true
  //   });
  // }, []);

  return (
    <>
      <div className="badges">
        <h5>BADGES:</h5>
        {Userdata?.badges?.length === 0 ? (
          <p>Coming Soon</p>
        ) : (
          <>
            {Userdata?.badges?.map((bdg,i) => (
              <img src={bdg.image} alt="" key={i} />
            ))}

            <a href="#more_badges" className="common_poup">
              More...
            </a>
          </>
        )}
        <div
          id="more_badges"
          className="after_load_scroll"
          style={{ display: 'none' }}
        >
          <div className="inner_model_box">
            <h3>BADGES</h3>

            <ul>
              {Userdata?.badges?.map((bdg,i) => (
                <li key={i}>
                  {' '}
                  <img src={bdg.image} alt="" />{' '}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Badges;
