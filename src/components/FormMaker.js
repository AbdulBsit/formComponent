import React, { useEffect } from "react";

import Segment from "./Segment";
import { useSegment } from "../customHooks";
function FormMaker() {
  const { addSection, segmentsState, activeIndexState } = useSegment();
  const [activeIndex, setActiveIndex] = React.useState(activeIndexState);
  const [segments, setSegments] = React.useState(segmentsState);
  const [segment, setSegment] = React.useState(segments[activeIndex]);

  useEffect(() => {
    setActiveIndex(activeIndexState);
    setSegments(segmentsState);
    setSegment(segments[activeIndex]);
  }, [activeIndexState, activeIndexState]);
  return (
    <div
      style={{
        margin: 25,
        height: window.innerHeight - 50,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Segment />

      <div style={{ alignSelf: "center" }}>
        <button onClick={addSection}>Add Section</button>
      </div>
      <div style={{ alignSelf: "center" }}>
        <button
          onClick={() =>
            console.log("segments:", segment, segments, activeIndex)
          }
        >
          Show Segments
        </button>
      </div>
    </div>
  );
}
export default FormMaker;
