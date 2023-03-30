import React from "react";

const button = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="Button">
        {" "}
        load more{" "}
      </button>
    </div>
  );
};

export default button;
