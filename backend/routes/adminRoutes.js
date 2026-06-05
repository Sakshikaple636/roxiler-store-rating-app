const express = require("express");

const router =
express.Router();

const verifyToken =
require(
    "../middleware/authMiddleware"
);

const roleMiddleware =
require(
    "../middleware/roleMiddleware"
);

const adminController =
require(
    "../controllers/adminController"
);

// ====================
// Add User
// ====================
router.post(
    "/add-user",
    verifyToken,
    roleMiddleware(["ADMIN"]),
    adminController.addUser
);

// ====================
// Add Store
// ====================
router.post(
    "/add-store",
    verifyToken,
    roleMiddleware(["ADMIN"]),
    adminController.addStore
);

// ====================
// Dashboard
// ====================
router.get(
    "/dashboard",
    verifyToken,
    roleMiddleware(["ADMIN"]),
    adminController.getDashboard
);

// ====================
// Get All Users
// ====================
router.get(
    "/users",
    verifyToken,
    roleMiddleware(["ADMIN"]),
    adminController.getAllUsers
);

// get All Stores

router.get(
    "/stores",
    verifyToken,
    roleMiddleware(["ADMIN"]),
    adminController.getAllStores
);


module.exports =
router;