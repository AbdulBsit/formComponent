import React from "react";
import {
  segmentReducer,
  activeIndexReducer,
  ADD_SEGMENT,
  EDIT_SEGMENT_KEYS,
  SET_ACTIVE_INDEX
} from "./Reducer";
export function useSegment() {
  const [segments, segmentsDispatch] = React.useReducer(segmentReducer, [
    {
      title: "Section Title",
      subtitle: "Section Subtitle",
      illustration: "",
      fields: []
    }
  ]);
  console.log("from line 15", segments);
  const [activeIndex, dispatchActiveindex] = React.useReducer(
    activeIndexReducer,
    0
  );
  function addSection() {
    segmentsDispatch({ type: ADD_SEGMENT });
    dispatchActiveindex({ type: SET_ACTIVE_INDEX, payload: activeIndex + 1 });
  }
  function setSegmentKeys(value) {
    console.log("from line 25", value);
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: { activeIndex, value }
    });
  }
  function addSegmentField(value) {
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndex,
        value: { fields: [...segments[activeIndex].fields, value] }
      }
    });
  }
  function getActiveIndex() {
    return activeIndex;
  }
  function getSegments() {
    return segments;
  }
  function getCurrentSegment() {
    console.log("this is current segment", segments[activeIndex]);
    return segments[activeIndex];
  }
  function editSegmentField(value, editIndex) {
    segmentsDispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndex,
        value: {
          fields: segments[activeIndex].fields.map((item, index) => {
            if (index === editIndex) {
              return value;
            } else return item;
          })
        }
      }
    });
  }

  return {
    getActiveIndex,
    getSegments,
    getCurrentSegment,
    addSection,
    setSegmentKeys,
    addSegmentField,
    editSegmentField
  };
}
