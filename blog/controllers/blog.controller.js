const userdata = require("../models/users.Schema")
const blogdata = require("../models/blog.Schema");
const fuse = require('fuse.js');


const createdata = async (req, res) => {
    let datas = await userdata.findById(req.cookies.id);
    let { title, content, image, category } = req.body;
    let data = await blogdata.create({
      title,content,image,category,author: datas.username,
    });
    res.cookie("blogId", data.id).send(`blog created by ${datas.username} `);
}

const createget = (req, res) => {
    res.render("blog")
}

const getindex = (req, res) => {
    res.render("index")
}

// all blog get routes
const allblog = async (req, res) => {
    try {
        let data = await blogdata.find();
        return res.send(data);

    } catch (error) {
        return res.send(error.message);
    }
}


const blogfilter = async (req, res) => {
    let { category } = req.query;
    if (category) {
        data = await blogdata.find({ category: category });
    } else {
        data = await blogdata.find();
    }
    res.send(data);
}

const blogdelete = async (req, res) => {
    let { id } = req.params;
    let data = await blogdata.findByIdAndDelete(id);
    try {
        if (data) res.redirect("/blog");
        else {
            res.send("no found");
        }
    } catch (error) {
        res.send("testing");
    }
};

const blogedit = async (req, res) => {
    let { id } = req.params;
    let data = await blogdata.findByIdAndUpdate(id, req.body);
    try {
        if (data) res.send("updated");
        else {
            res.send("not found");
        }
    } catch (error) {
        res.send("testing");
    }
};
const updateblog =async (req,res)=>{
    const {id} = req.params;
    
    let udata = await blogdata.findById(id);
    res.render("updateblog", {udata});
}

const singleblogs = async (req, res) => {
    try {
        let { id } = req.params;
        let singleBlog = await blogdata.findById(id);
        res.render("singleblog", { singleBlog });
    } catch (error) {
        return res.send(error.message)
    }
};

const like = async (req, res) => {
    try {
        let { id } = req.params;
        let liker = await userdata.findById(req.cookies.id)
        let likecount = await blogdata.findById(id);
        likecount.likedBy.push({ username: liker.username });
        await likecount.save();
        res.send({ likecount })

    } catch (error) {
        return res.send(error.message)
    }
};

const comment = async (req, res) => {
    try {
        let { comment } = req.body;
        let { id } = req.params;
        let commenter = await userdata.findById(req.cookies.id);
        let postcomment = await blogdata.findById(id);
        postcomment.comments.push({ text: comment, username: commenter.username });
        await postcomment.save();
        res.send(postcomment)
    } catch (error) {
        return res.send(error.message)
    }
};


// search
const search = async (req, res) => {
    try {
        let query = req.query.blogs;
        const blogs = await blogdata.find();
        const option = { keys: ["author", "category", "title",] }

        const fuseFilter = new fuse(blogs, option)
        const result = fuseFilter.search(query);
        return res.send(result)
    } catch (error) {
        return res.send(error.message)
    }
}
module.exports = { createdata, createget, getindex, allblog, blogfilter, search, blogdelete, blogedit, singleblogs, like, comment, updateblog}
