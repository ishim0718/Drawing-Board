// Import necessary packages and models
const router = require("express").Router();
const { Post, User, Comment, Tag } = require('../models');
const withAuth = require("../utils/auth");
const {Storage} = require('@google-cloud/storage')
const Multer = require('multer')

const multer = Multer({
    storage: Multer.memoryStorage(),
})

let pid = "sound-psyche-385917"
let fileName = "main-key"
const storage = new Storage({
    pid,
    fileName
})

const bucket = storage.bucket('inventor-website-123321')

// Route to render homepage
router.get("/", async (req, res) => {
  try {
        // Find all posts with associated usernames
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render homepage template with posts and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
        // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});
// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
        // Find post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });
    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });
    // Render post template with post data and login status
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
        // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});
// Route to render dashboard page with all posts by current user
// Find all posts by current user with associated usernames
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        { model: User, attributes: ["name"] },
        { model: Tag, attributes: ["name"] }
    ],
    });
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

//render the new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

//render the edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("editpost", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*Begining of Corbin's code*/

// placed in /new-post
router.get('/new-post', async (req, res)=>{
  try {
    const data = await Tag.findAll()
    const tags = data.map(tag=> tag.get({ plain: true }));
    console.log("Tags: "+tags)
    res.render("new-post", {tags,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
        // If there is an error, return 500 status code and error message
    res.status(500).json(err);
    }
})

// placed in /new-post
router.post("/new-post", multer.single('imgfile'),(req, res)=>{
  console.log("start POST route")
  try{
      if(req.file){
          //console.log(req.file)
          const blob = bucket.file(req.file.originalname)
          //console.log(blob)
          const stream = blob.createWriteStream()

          stream.on('finish', ()=>{
              res.status(200).json("Image posted.")
          })
          stream.end(req.file.buffer)
      }
  }catch(err){
      res.status(500).json(err)
      console.log("wtf")
  }
})


router.get("/search", async (req, res)=>{
  //if (req.session.logged_in) {
    try{
      let params = {}
      if(req.body && req.body.name && req.body.name!=''){
        params.name = req.body.name
      }
      if(req.body && req.body.tag){
        params.tag = req.body.tag
      }
      console.log("starting query")
      const postData = await Post.findAll({
        include: [
          { model: User, attributes: ["name"] },
          { model: Tag, attributes: ["name"] }
      ],
      }).catch(err=>console.log(err))
      const posts = postData.map(post=> post.get({ plain: true }));
      console.log("Post results:"+posts)
      res.render("search", {posts})
    }catch(err){
      res.status(500).json(err)
    }
    
 // }
})

/*End of Corbin's code*/

// module exports router
module.exports = router;