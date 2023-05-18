import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing";

export const MyResponsiveCirclePackingCanvas = ({
  data /* see data tab */,
}) => (
  <>
    <div className="chartTitle">Bubble Chart of Insights</div>
    <ResponsiveCirclePackingCanvas
      data={data}
      margin={{ top: 0, right: 20, bottom: 80, left: 20 }}
      id="name"
      colors={{ scheme: "spectral" }}
      colorBy="id"
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      padding={1}
      leavesOnly={true}
      enableLabels={true}
      label="value"
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2.4]],
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      animate={false}
    />
  </>
);
