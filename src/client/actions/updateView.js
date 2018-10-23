import { UPDATE_VIEW } from './type';

export const updateView = view => ({
  type: UPDATE_VIEW,
  payload: view
});
