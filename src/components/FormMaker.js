import React, { useEffect, useState } from "react";

import Segment from "./Segment";
import { useActions } from "../actions";
import { store } from "../store";

function FormMaker() {
  const { state, dispatch } = React.useContext(store);
  const { addSection } = useActions();
  const [activeIndex, setActiveIndex] = useState(0);

  const addSegment = () => {
    setActiveIndex(activeIndex + 1);
    addSection();
  };
  const prevSegment = () => {
    setActiveIndex(activeIndex - 1);
  };
  const nextSegment = () => {
    setActiveIndex(activeIndex + 1);
  };

  return (
    <div
      style={{
        margin: 25,
        height: window.innerHeight - 50,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ alignSelf: "center" }}>
        <button onClick={prevSegment} disabled={activeIndex === 0}>
          Go To previous
        </button>
      </div>
      <Segment activeIndex={activeIndex} />
      <div style={{ alignSelf: "center" }}>
        <button onClick={addSegment}>Add Section</button>
      </div>
      <div style={{ alignSelf: "center" }}>
        <button
          onClick={nextSegment}
          disabled={activeIndex + 1 === state.length}
        >
          Go Next Segment
        </button>
      </div>
    </div>
  );
}
export default FormMaker;
