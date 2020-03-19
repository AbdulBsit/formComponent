//action Types
export const ADD_SEGMENT = "ADD_SEGMENT";
export const REMOVE_SEGMENT = "REMOVE_SEGMENT";
export const EDIT_SEGMENT_KEYS = "EDIT_SEGMENT_KEYS";
export const SET_ACTIVE_INDEX = "SET_ACTIVE_INDEX";
export function segmentReducer(state, action) {
  switch (action.type) {
    case ADD_SEGMENT:
      state.push({
        title: "",
        subtitle: "",
        illustration: "",
        fields: []
      });
      return state;

    case REMOVE_SEGMENT:
      return state.filter((item, index) => index !== action.payload);

    case EDIT_SEGMENT_KEYS:
      state[action.payload.activeIndex] = {
        ...state[action.payload.activeIndex],
        ...action.payload.value
      };
      return state;
    default:
      throw new Error();
  }
}

// export function activeIndexReducer(state, action) {
//   switch (action.type) {
//     case SET_ACTIVE_INDEX:
//       return action.payload;
//     default:
//       return state;
//   }
// }
