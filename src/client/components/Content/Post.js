import React from 'react';
import { connect } from 'react-redux';

const Post = props => (
  <div>
    { props.post }
  </div>
);

const mapStateToProps = state => ({
  post: state.postReducer.post
});

export default connect(mapStateToProps)(Post);
