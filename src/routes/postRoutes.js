const { Router } = require("express");
const PostController = require("../controllers/post");
const Authentication = require("../middlewares/auth");

const router = Router();

const { verifyToken } = Authentication;
const { createPost, getAllPost, getPostById, updatePost, deletePost, changeState, getPublishedPostById, search } = PostController;

router.post("/create", verifyToken, createPost);
router.get("/", getAllPost);
router.get("/:postId", verifyToken, getPostById);
router.get("/blog/:postId", getPublishedPostById);

router.get("/look/search", verifyToken, search);

router.patch("/:postId", verifyToken, updatePost);


router.patch("/state/:postId", verifyToken, changeState);

router.delete("/:postId", verifyToken, deletePost);

module.exports = router;