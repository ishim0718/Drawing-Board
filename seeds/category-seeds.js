const { Category } = require('../models');

const categoryData = [
    {
      name: "Critique"
    },
    {
      name: "Hype"
    },
    {
      name: "Questions"
    },
  ];

  const seedCategory = () => Category.bulkCreate(categoryData);

  module.exports = seedCategory;