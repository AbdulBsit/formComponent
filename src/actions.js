import React from "react";
import { ADD_SEGMENT, EDIT_SEGMENT_KEYS } from "./Reducer";
import { store } from "./store";

export function useActions() {
  const { dispatch, state } = React.useContext(store);

  function addSection() {
    dispatch({ type: ADD_SEGMENT, payload: state });
  }
  function setSegmentKeys(activeIndex, value) {
    dispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: { activeIndex, value }
    });
  }
  function addSegmentField(activeIndex, value) {
    dispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndex,
        value: { fields: [...state[activeIndex].fields, value] }
      }
    });
  }

  function editSegmentField(activeIndex, value, editIndex) {
    const fields = (state[activeIndex].fields[editIndex] = value);
    dispatch({
      type: EDIT_SEGMENT_KEYS,
      payload: {
        activeIndex,
        value: {
          ...fields
        }
      }
    });
  }
  return { addSection, setSegmentKeys, addSegmentField, editSegmentField };
}
