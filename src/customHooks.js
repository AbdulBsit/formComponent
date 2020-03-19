import React, { useState, useEffect } from "react";
import {
  segmentReducer,
  activeIndexReducer,
  ADD_SEGMENT,
  EDIT_SEGMENT_KEYS,
  SET_ACTIVE_INDEX
} from "./Reducer";

export function useSegment() {
  const [segmentsState, setSegmentsState] = useState([
    {
      title: "Section Title",
      subtitle: "Section Subtitle",
      illustration: "",
      fields: []
    }
  ]);
  const [activeIndexState, setActiveIndexState] = useState(0);

  const [segments, segmentsDispatch] = React.useReducer(
    segmentReducer,
    segmentsState
    //segmentReducer
  );

  const [activeIndex, dispatchActiveindex] = React.useReducer(
    activeIndexReducer,
    activeIndexState
    //activeIndexState
  );
  useEffect(() => {
    setSegmentsState(segments);
    setActiveIndexState(activeIndex);
  }, [segments, activeIndex]);

  function addSection() {
    segmentsDispatch({ type: ADD_SEGMENT, payload: segmentsState });
    dispatchActiveindex({
      type: SET_ACTIVE_INDEX,
      payload: activeIndexState + 1
    });
  }
  function setSegmentKeys(value) {
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: { activeIndex: activeIndexState, value }
    });
  }
  function addSegmentField(value) {
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndex: activeIndexState,
        value: { fields: [...segmentsState[activeIndexState].fields, value] }
      }
    });
  }

  function editSegmentField(value, editIndex) {
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndexState,
        value: {
          fields: segmentsState[activeIndexState].fields.map((item, index) => {
            if (index === editIndex) {
              return value;
            } else return item;
          })
        }
      }
    });
  }

  return {
    activeIndexState,
    segmentsState,
    addSection,
    setSegmentKeys,
    addSegmentField,
    editSegmentField
  };
}
