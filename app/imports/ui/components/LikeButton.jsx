import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { HandThumbsUp } from 'react-bootstrap-icons';

const LikeButton = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Initialize likes from the server
    Meteor.call('posts.getLikes', postId, (error, result) => {
      if (!error) {
        setLikes(result);
        const userId = Meteor.userId();
        setLiked(result.includes(userId)); // Check if current user has liked
      }
    });
  }, [postId]);

  const handleLike = () => {
    if (!Meteor.userId()) {
      alert('Please log in to like this post.');
      return;
    }

    Meteor.call('posts.like', postId, (error, result) => {
      if (error) {
        alert('Error liking the post:', error.message);
      } else {
        // Assuming the server returns the updated likes array
        setLikes(result.length);
        setLiked(result.includes(Meteor.userId()));
      }
    });
  };

  return (
    <Button variant="link" className="icon-button" onClick={handleLike} style={{ color: liked ? 'var(--dark-green)' : 'grey' }}>
      <HandThumbsUp />{' '}
      {likes}
    </Button>
  );
};

export default LikeButton;
