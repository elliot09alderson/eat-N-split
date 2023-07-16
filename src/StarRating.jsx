const starWrapperStyle = {
  display: "flex",
  justifyAlign: "center",
  alignItems: "center",
  lineHeight: 1.5,
};

const starContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

import { PropTypes } from "prop-types";
import React, { useState } from "react";

const StarRating = ({
  maxRating = 10,
  size = 48,
  color = "#fcc419",
  className = "",
  defaultRating = 0,
  messages = [],
  onSetRating,
}) => {
  const [rate, setRate] = useState(defaultRating);
  const [tempRate, setTempRate] = useState(0);
  StarRating.propTypes = {
    maxRating: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    defaultRating: PropTypes.number,
    messages: PropTypes.array,

    onSetRating: PropTypes.func,
  };
  function Rate(idx) {
    setRate(idx);
    onSetRating(idx);
  }
  const starTextStyle = {
    lineHeight: 1,
    color,
    marginLeft: "10px",
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={starWrapperStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={i}>
            <Star
              idx={i + 1}
              Rate={Rate}
              selectedStar={i < tempRate}
              onHover={(idx) => setTempRate(idx)}
              offHover={() => setTempRate(rate)}
              size={size}
              color={color}
            />
          </span>
        ))}
      </div>
      <span style={starTextStyle}>
        {messages.length === maxRating
          ? messages[tempRate - 1]
          : tempRate
          ? tempRate || rate
          : ""}
      </span>
    </div>
  );
};

function Star({
  idx,
  Rate,
  color = "yellow",
  onHover,
  offHover,
  selectedStar,
  size,
  messages,
}) {
  const star = {
    height: `${size}px`,
    width: `${size}px`,
    cursor: "pointer",
    display: "block",
  };

  return (
    <span
      type="button"
      onMouseOver={() => onHover(idx)}
      onMouseLeave={() => offHover(idx)}
      onClick={() => Rate(idx)}
    >
      {selectedStar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          style={star}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          style={star}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
export default StarRating;
