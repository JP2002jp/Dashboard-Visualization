import { ResponsiveRadar } from "@nivo/radar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const MyResponsiveRadar = ({ data, keys /* see data tab */ }) => (
  <ResponsiveRadar
    data={data}
    keys={keys}
    indexBy="taste"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    maxValue="auto"
    borderColor={{ from: "color" }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={{ scheme: "nivo" }}
    blendMode="multiply"
    motionConfig="wobbly"
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        translateX: -80,
        translateY: -80,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);
