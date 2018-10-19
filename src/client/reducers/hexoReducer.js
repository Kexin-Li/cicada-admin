import { 
  HEXO_SERVER_SUCCESS, HEXO_SERVER_ERROR, 
  HEXO_STOP_SUCCESS, HEXO_STOP_ERROR, 
  HEXO_DEPLOY_SUCCESS, HEXO_DEPLOY_ERROR
} from '../actions/type';

export default function(state = {}, action) {
  switch(action.type) {
    case HEXO_SERVER_SUCCESS:
      return { ...state, server: action.payload };
    case HEXO_SERVER_ERROR:
      return { ...state, hexoServerError: true };
    case HEXO_STOP_SUCCESS:
      return { ...state, stop: action.payload };
    case HEXO_STOP_ERROR:
      return { ...state, hexoStopError: true };
    case HEXO_DEPLOY_SUCCESS:
      return { ...state, deploy: action.payload };
    case HEXO_DEPLOY_ERROR:
      return { ...state, hexoDeployError: true };
    default:
      return state;
  }
};