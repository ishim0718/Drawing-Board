const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        category_id: 1,
        post_id: 1,
        comment: "this sucks",
    },
    {
        user_id: 2,
        category_id: 1,
        post_id: 1,
        comment: "this really sucks",
    },
    {
        user_id: 3,
        category_id: 2,
        post_id: 1,
        comment: "this is great",
    },
  ];

  const seedComment = () => Comment.bulkCreate(commentData);

  module.exports = seedComment;