import { UPDATE_VIEW } from './type';

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
}
