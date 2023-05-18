import { ResponsiveChoropleth } from "@nivo/geo";
import { React, useEffect, useState } from "react";
import countries from "./world_countries.json";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveChoropleth = ({ data /* see data tab */ }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      setContainerWidth(container.clientWidth);
    }
    const handleResize = () => {
      setContainerWidth(
        parseInt(document.getElementById("container").clientWidth)
      );
      console.log("cw", document.getElementById("container").clientWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const ps = containerWidth / (2 * Math.PI);
  return (
    <div id="container" className="geo">
      <div className="chartTitle">GeoMap of Countries</div>

      <ResponsiveChoropleth
        data={data}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        projectionScale={ps}
        colors="nivo"
        domain={[0, 120]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
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
          {
            id: "gradient",
            type: "linearGradient",
            colors: [
              {
                offset: 0,
                color: "#000",
              },
              {
                offset: 100,
                color: "inherit",
              },
            ],
          },
        ]}
        fill={[
          {
            match: {
              id: "CAN",
            },
            id: "dots",
          },
          {
            match: {
              id: "CHN",
            },
            id: "lines",
          },
          {
            match: {
              id: "ATA",
            },
            id: "gradient",
          },
        ]}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 0,
            translateY: -65,
            itemsSpacing: 0,
            itemWidth: 64,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#000000",
            itemOpacity: 1,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
