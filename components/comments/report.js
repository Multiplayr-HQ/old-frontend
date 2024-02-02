import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';

const ReportsComments = ({ type }) => {
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
      <a href="#!" className="report_link model_show_btn">
        {type === 'Post' ? (
          'Report'
        ) : (
          <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
        )}
      </a>

      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box report_model">
          <h3>Report</h3>

          <ul>
            <li>
              <a href="#">Violence</a>
            </li>
            <li>
              <a href="#">Harassment</a>
            </li>
            <li>
              <a href="#">Self-Injury</a>
            </li>
            <li>
              <a href="#">False Information</a>
            </li>
            <li>
              <a href="#">Spam</a>
            </li>
            <li>
              <a href="#">Hate Speech</a>
            </li>
            <li>
              <a href="#">Other</a>
            </li>
          </ul>
        </div>

        <div className="overlay"></div>
      </div>
    </>
  );
};

export default ReportsComments;
