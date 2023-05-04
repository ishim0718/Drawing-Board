const { Tag } = require('../models');

const tagData = [
    {
      name: "Engineering"
    },
    {
      name: "Design"
    },
    {
      name: "Software"
    },
  ];

  const seedTag = () => Tag.bulkCreate(tagData);

  module.exports = seedTag;