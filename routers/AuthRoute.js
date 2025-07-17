const express = require("express");
const AuthController = require("../controllers/AuthController");

const api = express.Router();

api.post("/auth/register", AuthController.register);

module.exports = api;
