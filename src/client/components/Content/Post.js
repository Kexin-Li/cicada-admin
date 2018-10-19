import React from 'react';
import { connect } from 'react-redux';

const Post = (props) => {
  return (
    <div>
      { props.post }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post
  };
};

export default connect(mapStateToProps)(Post);