import { 
  FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
  FETCH_DRAFTS_SUCCESS, 
  FETCH_PAGES_SUCCESS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_TAGS_SUCCESS
} from '../actions/type';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case FETCH_POSTS_ERROR:
      return { ...state, fetchPostsError: true };
    case FETCH_DRAFTS_SUCCESS:
      return { ...state, drafts: action.payload };
    case FETCH_PAGES_SUCCESS:
      return { ...state, pages: action.payload };
    case FETCH_SETTINGS_SUCCESS:
      return { ...state, settings: action.payload };
    case FETCH_TAGS_SUCCESS:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}