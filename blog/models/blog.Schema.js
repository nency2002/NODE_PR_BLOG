const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    author: String,
    category: String,
    likedBy: [{ username: String }],
    comments: [{
        text: String,
        username: String,
        date: { type: Date, default: Date.now }
    }]
})

const blogdata = mongoose.model('Blog', BlogSchema)


module.exports = blogdata