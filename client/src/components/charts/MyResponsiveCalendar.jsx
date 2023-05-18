import { ResponsiveTimeRange } from "@nivo/calendar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveCalendar = ({ data /* see data tab */ }) => (
  <>
    {" "}
    <div className="chartTitle">Heatmap of Added Dates</div>
    <ResponsiveTimeRange
      data={data}
      from="2016-06-01"
      to="2017-02-12"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      weekdayLegendOffset={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
          translateX: -60,
          translateY: 0,
          symbolSize: 20,
        },
      ]}
    />
  </>
);
