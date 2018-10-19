import { FETCH_POST } from "../actions/type";

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  };
}