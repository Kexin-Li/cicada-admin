import { UPDATE_VIEW } from './type';

export const updateView = (view) => {
  return {
    type: UPDATE_VIEW,
    payload: view
  };
};