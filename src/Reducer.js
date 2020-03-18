import React from "react";

//action Types
export const ADD_SEGMENT = "ADD_SEGMENT";
export const REMOVE_SEGMENT = "REMOVE_SEGMENT";
export const EDIT_SEGMENT_KEYS = "EDIT_SEGMENT_KEYS";
export const SET_ACTIVE_INDEX = "SET_ACTIVE_INDEX";
export function segmentReducer(state, action) {
  switch (action.type) {
    case ADD_SEGMENT:
      return [
        ...state,
        {
          title: "Section Title",
          subtitle: "Section Subtitle",
          illustration: "",
          fields: []
        }
      ];
      break;

    case REMOVE_SEGMENT:
      return state.filter((item, index) => index !== action.payload);
      break;

    case EDIT_SEGMENT_KEYS:
      console.log("before edit global state", state);
      return state.map((item, index) => {
        console.log("this is item no", index + 1, item);
        if (index === action.payload.activeIndex) {
          return { ...item, ...action.payload.value };
        } else {
          return item;
        }
      });

      break;
    default:
      console.log("this is default", state);
      return state;
  }
}

export function activeIndexReducer(state = 0, action) {
  switch (action.type) {
    case SET_ACTIVE_INDEX:
      return action.payload;
      break;
    default:
      return state;
  }
}
