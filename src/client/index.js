import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import reducers from './reducers/index';
import App from './components/App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/posts" component={App} />
        <Route path="/drafts" component={App} />
        <Route path="/pages" component={App} />
        <Route path="/tags" component={App} />
        <Route path="/settings" component={App} />
        <Route path="/posts/:name" component={App} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
