import React, { useEffect } from "react";

import Segment from "./Segment";
import { useSegment } from "../customHooks";
function FormMaker() {
  const {
    addSection,
    getSegments,
    getCurrentSegment,
    getActiveIndex
  } = useSegment();
  var segment = getCurrentSegment();
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
          onClick={() => console.log("segments:", segment, getActiveIndex())}
        >
          Show Segments
        </button>
      </div>
    </div>
  );
}
export default FormMaker;
