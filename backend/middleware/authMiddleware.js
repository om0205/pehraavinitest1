const express = require("express");
const basicAuth = require("express-basic-auth");

const authMiddleware = basicAuth({
  users: {
    [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD,
  },
  challenge: true,
  unauthorizedResponse: "Unauthorized",
});

module.exports = authMiddleware;