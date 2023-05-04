const { Post } = require('../models');

const postData = [
    {
        title: "Airplane",
        description: "lorem ipsum",
        user_id: 1,
        tag_id: 1,
    },
    {
        title: "Saxophone",
        description: "lorem ipsum",
        user_id: 2,
        tag_id: 2,
    },
    {
        title: "New Language",
        description: "lorem ipsum",
        user_id: 3,
        tag_id: 3,
    },
  ];

  const seedPost = () => Post.bulkCreate(postData);

  module.exports = seedPost;