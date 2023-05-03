const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');
const Tag = require('./Tag');
const Update = require('./Update');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Update, {
    foreignKey: 'user_id'
});

Post.hasOne(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post.hasOne(Tag, {
//     foreignKey: ''
// })

Comment.hasOne(Post, {
    foreignKey: 'post_id'
});

// Comment.hasOne(Category, {
//     foreignKey: 'category_id'
// });



module.exports = { User, Post, Comment, Category, Tag, Update };