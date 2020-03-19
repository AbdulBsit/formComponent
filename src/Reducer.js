import React from "react";

//action Types
export const ADD_SEGMENT = "ADD_SEGMENT";
export const REMOVE_SEGMENT = "REMOVE_SEGMENT";
export const EDIT_SEGMENT_KEYS = "EDIT_SEGMENT_KEYS";
export const SET_ACTIVE_INDEX = "SET_ACTIVE_INDEX";
export function segmentReducer(state, action) {
  console.log("from 9", state, action);
  switch (action.type) {
    case ADD_SEGMENT:
      console.log("state ebefore addding section", state);
      return [
        ...action.payload,
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
      state = state.map((item, index) => {
        console.log("this is item no", index + 1, item);
        if (index === action.payload.activeIndex) {
          return { ...item, ...action.payload.value };
        } else {
          return item;
        }
      });
      console.log("after edit", state);
      return state;

      break;
    default:
      return state;
  }
}

export function activeIndexReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_INDEX:
      return action.payload;
      break;
    default:
      return state;
  }
}
