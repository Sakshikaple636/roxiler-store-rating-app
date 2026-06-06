const express =
require("express");

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

const ownerController =
require(
"../controllers/ownerController"
);

// Dashboard
router.get(
    "/dashboard",
    verifyToken,
    roleMiddleware(
        ["OWNER"]
    ),
    ownerController
    .getOwnerDashboard
);

// Ratings
router.get(
    "/ratings",
    verifyToken,
    roleMiddleware(
        ["OWNER"]
    ),
    ownerController
    .getStoreRatings
);

module.exports =
router;