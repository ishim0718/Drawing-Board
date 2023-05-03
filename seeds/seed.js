// const seedPost = require('./post-seeds')
const seedCategory = require('./category-seeds');
// const seedComment = require('./comment-seeds');
// const seedTag = require('./tag-seeds');
const seedUser = require('./user-seeds');
// const seedUpdate = require('./update-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

//   await seedPost();
//   console.log('\n----- POST SEEDED -----\n');

  await seedCategory();
  console.log('\n----- CATERGORY SEEDED -----\n');

//   await seedTag();
//   console.log('\n----- TAG SEEDED -----\n');

//   await seedComment();
//   console.log('\n----- COMMENT SEEDED -----\n');

  await seedUser();
  console.log('\n----- USER SEEDED -----\n');

//   await seedUpdate();
//   console.log('\n----- UPDATE SEEDED -----\n');

  process.exit(0);
};

seedAll();
