import React, { useEffect, useState } from 'react';

const SocialLink = ({ type, socialLink, closeForm }) => {
  const [link, setLink] = useState('');
  const handleData = (link, type) => {
    socialLink.push({
      link,
      type
    });
    closeForm(false);
  };

  return (
    <div style={{ display: 'block' }}>
      <div className="form-group">
        <input
          type="text"
          placeholder={`enter ${type} link`}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="btn"
          type="button"
          onClick={() => handleData(link, type)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SocialLink;
