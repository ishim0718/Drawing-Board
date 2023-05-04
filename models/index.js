const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');
const Tag = require('./Tag');

//User relation to Post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//User relation to Comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//Post to Comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

//Category to Comment
Comment.hasOne(Category, {
    foreignKey: 'category_id'
});

//Post to Tag
Post.hasOne(Tag, {
    foreignKey: 'tag_id',
});


module.exports = { User, Post, Comment, Category, Tag };