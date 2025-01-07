import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const MoodMeter = React.memo(({ value }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <ReactSpeedometer
        value={value}
        minValue={0}
        maxValue={100}
        segments={5}
        needleColor="#f0f0f0"
        segmentColors={[
            "#b12222", // Extreme Fear (dark red)
            "#ffc107", // Fear (golden yellow)
            "#808080", // Neutral (soft gray)
            "#17a2b8", // Greed (bright teal)
            "#28a745", // Extreme Greed (vivid green)
        ]}
        customSegmentStops={[0, 24, 49, 50, 74, 100]}
        currentValueText={`Current Mood: ${value}`}
        textColor="#f0f0f0"
        customSegmentLabels={[
            { text: "Extreme Fear", position: "OUTSIDE", color: "#b12222" },
            { text: "Fear", position: "OUTSIDE", color: "#ffc107" },
            { text: "Neutral", position: "OUTSIDE", color: "#808080" },
            { text: "Greed", position: "OUTSIDE", color: "#17a2b8" },
            { text: "Extreme Greed", position: "OUTSIDE", color: "#28a745" },
        ]}
        forceRender={true}
        needleTransitionDuration={2000}
        needleTransition="easeElastic"
        height={300}
        width={500}
      />
    </div>
  );
});

export default MoodMeter;