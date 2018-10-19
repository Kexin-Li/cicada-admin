import { FETCH_POST } from './type';

export const fetchPost = (content) => {
  return {
    type: FETCH_POST,
    payload: content
  }
};