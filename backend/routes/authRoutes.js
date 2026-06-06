const express =
require("express");

const router =
express.Router();

const authController =
require(
    "../controllers/authController"
);

const verifyToken =
require(
    "../middleware/authMiddleware"
);

// Register
router.post(
    "/register",
    authController.register
);

// Login
router.post(
    "/login",
    authController.login
);

router.put(
    "/change-password",
    verifyToken,
    authController.changePassword
);

module.exports =
router;