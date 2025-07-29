const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/PostController");
const md_auth = require("../middlewares/Authenticated");

const md_multiparty = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//ENDPOINTS

module.exports = api;
