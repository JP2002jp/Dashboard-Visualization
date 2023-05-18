import React from "react";
export const Overview = ({ data }) => {
  return (
    <div style={{ height: "10vw", width: "20vw" }} className=" ocontainer">
      Record Count
      <p>
        {data.length} <span>{data.length / 10}%</span>
      </p>
      <div className="mainDiv">
        <div
          style={{ width: `${data.length / 10}%` }}
          className="childDiv"
        ></div>
      </div>
    </div>
  );
};
