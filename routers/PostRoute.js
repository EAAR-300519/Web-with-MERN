const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/PostController");
const md_auth = require("../middlewares/Authenticated");

const md_multiparty = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//ENDPOINTS
api.post(
  "/post",
  [md_auth.asureAuth, md_multiparty],
  PostController.createPost
);
api.get("/posts", PostController.getPosts);
api.patch(
  "/post/:id",
  [md_auth.asureAuth, md_multiparty],
  PostController.updatePost
);
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost);
api.get("/post/:path", PostController.getPostPath);

module.exports = api;
