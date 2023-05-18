import { ResponsiveTreeMap } from "@nivo/treemap";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveTreeMap = ({ data /* see data tab */ }) => (
  <>
    {" "}
    <div className="chartTitle">TreeMap of Topics</div>
    <ResponsiveTreeMap
      data={data}
      identity="name"
      valueFormat=".02s"
      margin={{ top: 10, right: 10, bottom: 80, left: 10 }}
      label="id"
      labelSkipSize={30}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.2]],
      }}
      parentLabelPosition="left"
      parentLabelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.1]],
      }}
    />
  </>
);
