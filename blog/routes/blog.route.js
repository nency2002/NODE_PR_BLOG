const { Router } = require('express');
const { createdata, createget, getindex, allblog, blogfilter, search, blogdelete, blogedit, singleblogs, like, comment, updateblog } = require('../controllers/blog.controller');
const { isAuth, validation, islogin } = require('../middlewares/auth');
const blog = Router();

// add blogs
blog.get("/create", isAuth, createget)
blog.post("/create", validation, createdata)

blog.get("/", getindex)

blog.get("/blogs", allblog);
blog.get("/filter", blogfilter);

blog.delete("/delete/:id", isAuth, blogdelete)

blog.patch("/edit/:id", isAuth, blogedit)
blog.get("/updateblog/:id", updateblog);

blog.get("/singleBlog/:id", singleblogs)

blog.patch("/like/:id", islogin, like)

blog.patch("/comment/:id", islogin, comment)

// search
blog.get("/search", search)

module.exports = blog