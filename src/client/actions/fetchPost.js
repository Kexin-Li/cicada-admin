import { FETCH_POST } from './type';

export const fetchPost = content => ({
  type: FETCH_POST,
  payload: content
});
