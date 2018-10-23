import axios from 'axios';
import {
  FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
  FETCH_DRAFTS_SUCCESS,
  FETCH_PAGES_SUCCESS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_TAGS_SUCCESS
} from './type';

export const fetchPostsSuccess = payload => ({
  type: FETCH_POSTS_SUCCESS,
  payload
});

export const fetchDraftsSuccess = payload => ({
  type: FETCH_DRAFTS_SUCCESS,
  payload
});

export const fetchPagesSuccess = payload => ({
  type: FETCH_PAGES_SUCCESS,
  payload
});

export const fetchSettingsSuccess = (db) => {
  const settings = {
    hexoPath: db.hexoPath,
    theme: db.theme
  };
  return {
    type: FETCH_SETTINGS_SUCCESS,
    payload: settings
  };
};

export const fetchTagsSuccess = payload => ({
  type: FETCH_TAGS_SUCCESS,
  payload
});

export const fetchPostsError = () => ({
  type: FETCH_POSTS_ERROR
});

export const fetchPosts = () => {
  const url = '/posts';
  const request = axios.get(url);

  return (dispatch) => {
    request.then((res) => {
      console.log('posts', res.data.db);
      dispatch(fetchPostsSuccess(res.data.db.posts));
      dispatch(fetchDraftsSuccess(res.data.db.drafts));
      dispatch(fetchPagesSuccess(res.data.db.pages));
      dispatch(fetchSettingsSuccess(res.data.db));
      dispatch(fetchTagsSuccess(res.data.db.tags));
    }).catch((err) => {
      console.log(err);
      dispatch(fetchPostsError());
    });
  };
};
