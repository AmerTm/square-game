import React from "react";

const Cell = ({ w, h, color, biggest }) => {
  return (
    <td
      className="cell"
      style={{
        width: w ? w : "4em",
        height: h ? h : "4em",
        border: "1px solid #ddd",
        backgroundColor: color,
      }}
    ></td>
  );
};

export default Cell;
