import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const MoodMeter = React.memo(({ value }) => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

  // Update dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.outerWidth;
      const newDimensions =
        screenWidth < 768
          ? { width: screenWidth * 0.85, height: screenWidth * 0.55 }
          : { width: 500, height: 300 };
  
      // Update state only if dimensions have changed
      setDimensions((prevDimensions) =>
        prevDimensions.width !== newDimensions.width ||
        prevDimensions.height !== newDimensions.height
          ? newDimensions
          : prevDimensions
      );
    };
  
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  

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
        focusable={true}
        needleTransitionDuration={2000}
        needleTransition="easeElastic"
        height={dimensions.height} // Dynamic height
        width={dimensions.width} // Dynamic width
      />
    </div>
  );
});

MoodMeter.displayName = "MoodMeter";

export default MoodMeter;
