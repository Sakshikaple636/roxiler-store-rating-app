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

const userController =
require(
"../controllers/userController"
);

// View Stores
router.get(
    "/stores",
    verifyToken,
    roleMiddleware(
        ["USER"]
    ),
    userController.getStores
);

// Submit Rating
router.post(
    "/submit-rating",
    verifyToken,
    roleMiddleware(
        ["USER"]
    ),
    userController.submitRating
);

// Update Rating
router.put(
    "/update-rating",
    verifyToken,
    roleMiddleware(
        ["USER"]
    ),
    userController.updateRating
);

//Search Stores
router.get(
    "/search-stores",
    verifyToken,
    userController.searchStores
);

//Password 
router.put(
    "/update-password",
    verifyToken,
    roleMiddleware([
        "USER",
        "OWNER",
        "ADMIN"
    ]),
    userController.updatePassword
);


module.exports =
router;