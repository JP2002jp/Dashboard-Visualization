import React from "react";
import { useState } from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";

export const MyResponsiveBar = ({ data /* see data tab */ }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  //console.log(minValue, maxValue);
  const handleMinValueChange = (event) => {
    if (parseInt(maxValue) - parseInt(event.target.value) > 200) {
      setMaxValue(`${parseInt(event.target.value) + 200}`);
    }
    if (parseInt(event.target.value) + 10 > parseInt(maxValue)) {
      setMaxValue(`${parseInt(event.target.value) + 10}`);
    }
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event) => {
    if (parseInt(event.target.value) - parseInt(minValue) > 200) {
      setMinValue(`${parseInt(event.target.value) - 200}`);
    }
    if (parseInt(event.target.value) < 10 + parseInt(minValue)) {
      setMinValue(`${parseInt(event.target.value) - 10}`);
    }
    setMaxValue(event.target.value);
  };
  return (
    <>
      <div className="chartTitle">BarChart</div>
      <ResponsiveBarCanvas
        data={data.slice(minValue, maxValue)}
        keys={["", "", "", "relevance", "likelihood", "impact", "intensity"]}
        indexBy="title"
        margin={{ top: 0, right: 0, bottom: 120, left: 0 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "intensity",
            },
            id: "dots",
          },
          {
            match: {
              id: "relevance",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 20,
          tickPadding: 20,
          tickRotation: 90,
          legend: "variables",
          legendPosition: "middle",
          legendOffset: -53,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: -96,
            translateY: 48,
            itemsSpacing: 2,
            itemWidth: 72,
            itemHeight: 65,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 17,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in title: " + e.indexValue
        }
      />
      <div className="range-slider">
        <input
          className="range1"
          type="range"
          min="0"
          max={data.length - 5}
          value={minValue}
          onChange={handleMinValueChange}
        />
        <input
          className="range2"
          type="range"
          min="10"
          max={data.length}
          value={maxValue}
          onChange={handleMaxValueChange}
        />
      </div>
    </>
  );
};
