import React from 'react';
import PostCard from './PostCard';

const Posts = (props) => {
  const renderPosts = () => {
    const posts = props.view;
    if (posts) {
      return posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          posts={posts}
        />
      ));
    }
  };
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}
    >
      { renderPosts() }
    </div>
  );
};

export default Posts;
