// Import the required modules
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const categoryRoutes = require("./category-routes");
const updateRoutes = require("./update-routes");
const tagRoutes = require("./tag-routes");

// Set up the routes
router.use("/users", userRoutes); // Routes for user-related functionality
router.use("/posts", postRoutes); // Routes for post-related functionality
router.use("/comments", commentRoutes); // Routes for comment-related functionality
router.use("/categories", categoryRoutes); // Routes for category-related functionality
router.use("/update", updateRoutes); // Routes for update-related functionality
router.use("/tag", tagRoutes); // Routes for tag-related functionality

// Export the router
module.exports = router;