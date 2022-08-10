var Post = require("../../models/Post");

var router = require("express").Router();

// @AssetPlus: This is a sample get request
router.post("/", async (req, res) => {
  console.log("hello", req.body);
  try {
    var post = new Post(req.body);
    await post.save();
    // var posts = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (e) {
    return res.status(500).json({ message: "error" });
  }
});
router.get("/", async (req, res) => {
  var posts = await Post.find();
  return res.send(posts);
});

// @AssetPlus: Add other routes here
// router.post("/add")

module.exports = router;
