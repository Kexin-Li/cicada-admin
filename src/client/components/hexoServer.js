import axios from 'axios';
import { 
  HEXO_SERVER_SUCCESS, HEXO_SERVER_ERROR,
  HEXO_STOP_SUCCESS, HEXO_STOP_ERROR,
  HEXO_DEPLOY_SUCCESS, HEXO_DEPLOY_ERROR
} from './type';

export const hexoServer = () => {
  const url = '/hexoserver';
  const request = axios.get(url);

  return (dispatch) => {
    request.then(res => {
      const data = res.data;
      if (data.status !== 'success') {
        dispatch(hexoServerError());
      } else {
        dispatch(hexoServerSuccess(data));
      }
    }).catch(err => {
      console.log(err);
      dispatch(hexoServerError());
    });
  };
};

export const hexoStop = () => {
  const url = '/hexostop';
  const request = axios.get(url);

  return (dispatch) => {
    request.then(res => {
      const data = res.data;
      if (data.status !== 'success') {
        dispatch(hexoStopError());
      } else {
        dispatch(hexoStopSuccess(data));
      }
    }).catch(err => {
      console.log(err);
    });
  };
};

export const hexoDeploy = () => {
  const url = '/hexodeploy';
  const request = axios.get(url);

  return (dispatch) => {
    request.then(res => {
      const data = res.data;
      if (data.status !== 'success') {
        dispatch(hexoDeployError());
      } else {
        dispatch(hexoDeploySuccess(data));
      }
    }).catch(err => {
      console.log(err);
    });
  };
};

export const hexoServerSuccess = (payload) => {
  return {
    type: HEXO_SERVER_SUCCESS,
    payload
  };
};

export const hexoServerError = () => {
  return {
    type: HEXO_SERVER_ERROR
  };
};

export const hexoStopSuccess = (payload) => {
  return {
    type: HEXO_STOP_SUCCESS,
    payload
  };
};

export const hexoStopError = () => {
  return {
    type: HEXO_STOP_ERROR
  };
};

export const hexoDeploySuccess = (payload) => {
  return {
    type: HEXO_DEPLOY_SUCCESS,
    payload
  };
};

export const hexoDeployError = () => {
  return {
    type: HEXO_DEPLOY_ERROR
  };
};