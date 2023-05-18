import React from "react";
import { useEffect, useState } from "react";
import "./charts.css";
import {
  processCalender,
  processRadar,
  processGeo,
  processPie,
  processBub,
  processTree,
  processBar,
} from "../config/logic";
import { MyResponsiveRadar } from "./charts/MyResponsiveRadar";
import { MyResponsiveCalendar } from "./charts/MyResponsiveCalendar";
import { MyResponsiveChoropleth } from "./charts/MyResponsiveChoropleth";
import { MyResponsivePie } from "./charts/MyResponsivePie";
import { MyResponsiveCirclePackingCanvas } from "./charts/MyResponsiveCirclePackingCanvas";
import { MyResponsiveTreeMap } from "./charts/MyResponsiveTreeMap";
import { MyResponsiveBar } from "./charts/ResponsiveBar";
import { Overview } from "./Overview";
import { MyDataGrid } from "./DataGrid";
// import { QuickFilteringGrid } from "./DataGrid";
export const Charts = ({ data }) => {
  const [radarData, setRadarData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [calender, setCalender] = useState([]);
  const [geo, setGeo] = useState([]);
  const [pie, setPie] = useState([]);
  const [bub, setBub] = useState([]);
  const [bar, setBar] = useState([]);

  const [tree, setTree] = useState([]);
  const [range, setRange] = useState(0);

  const handleChange = async (event) => {
    const r = parseInt(event.target.value);
    setRange(r);
    //console.log("range" + r);
    const { radardata, key } = await processRadar(data, r);
    // console.log(radardata, key);
    setKeys(key);
    setRadarData(radardata);
    //setBar(processBar(data, range));
  };
  useEffect(() => {
    async function fetchdata() {
      let cc = processCalender(data, "added");
      setCalender(cc);
      const { radardata, key } = await processRadar(data, 0);
      setGeo(processGeo(data));
      setKeys(key);
      setRadarData(radardata);
      setPie(processPie(data));
      setBub(processBub(data));
      setTree(processTree(data));
      setBar(processBar(data));
    }
    //console.log("inner");
    fetchdata();
  }, [data]);
  //console.log("outer");

  return (
    <div className="charts">
      <Overview data={data} />
      {calender && calender.length && (
        <div className="calender">
          {" "}
          <MyResponsiveCalendar data={calender} />
        </div>
      )}
      {geo && <MyResponsiveChoropleth data={geo} />}
      {pie && (
        <div className="bub">
          <MyResponsivePie data={pie} />
        </div>
      )}
      {bub && bub.hasOwnProperty("children") && (
        <div className="bub">
          <MyResponsiveCirclePackingCanvas data={bub} />
        </div>
      )}
      {tree && tree.hasOwnProperty("children") && (
        <div className="tree">
          <MyResponsiveTreeMap data={tree} />
        </div>
      )}
      <div className="bar">
        <MyResponsiveBar data={bar} />
      </div>
      {keys && radarData && (
        <div className="radar">
          {" "}
          <MyResponsiveRadar data={radarData} keys={keys} />
          {/* <input
            type="range"
            min="0"
            max={`${data.length - 5}`}
            value={range}
            step={1}
            onChange={handleChange}
          /> */}
        </div>
      )}
      <div className="dgrid">
        <MyDataGrid data={data} />
      </div>
    </div>
  );
};
