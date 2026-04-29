const express = require('express');
const authControllers = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();



router.post("/register", authControllers.registerUser)
router.post("/login", authControllers.loginUser)
router.get("/verify", authMiddleware.authUser, authControllers.verifyUser)



module.exports = router;