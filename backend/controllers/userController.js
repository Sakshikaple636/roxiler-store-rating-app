const db = require("../config/db");

// ====================
// Get All Stores
// ====================
const getStores = async (
    req,
    res
) => {

    try {

        const [stores] =
        await db.query(
            `SELECT
            s.id,
            s.name,
            s.email,
            s.address,

            ROUND(
                AVG(r.rating),
                1
            ) AS averageRating

            FROM stores s

            LEFT JOIN ratings r
            ON s.id =
            r.store_id

            GROUP BY s.id`
        );

        res.status(200).json(
            stores
        );

    } catch (error) {

        console.log(
            "Get Stores Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Submit Rating
// ====================
const submitRating =
async (req, res) => {

    try {

        const user_id =
        req.user.id;

        const {
            store_id,
            rating
        } = req.body;
        
        if (
  rating < 1 ||
  rating > 5
) {
  return res.status(400).json({
    message:
      "Rating must be between 1 and 5"
  });
}
        // Rating validation
        if (
            rating < 1 ||
            rating > 5
        ) {

            return res
            .status(400)
            .json({
                message:
                "Rating must be between 1 and 5"
            });
        }

        // Check already rated
        const [existing] =
        await db.query(
            `SELECT *
            FROM ratings
            WHERE user_id=?
            AND store_id=?`,
            [
                user_id,
                store_id
            ]
        );

        if (
            existing.length > 0
        ) {

            return res
            .status(400)
            .json({
                message:
                "You already rated this store"
            });
        }

        // Insert Rating
        await db.query(
            `INSERT INTO ratings
            (
                user_id,
                store_id,
                rating
            )
            VALUES(?,?,?)`,
            [
                user_id,
                store_id,
                rating
            ]
        );

        res.status(201).json({
            message:
            "Rating Submitted Successfully"
        });

    } catch (error) {

        console.log(
            "Submit Rating Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Update Rating
// ====================
const updateRating =
async (req, res) => {

    try {

        const user_id =
        req.user.id;

        const {
            store_id,
            rating
        } = req.body;

        if (
  rating < 1 ||
  rating > 5
) {
  return res.status(400).json({
    message:
      "Rating must be between 1 and 5"
  });
}
        // Rating validation
        if (
            rating < 1 ||
            rating > 5
        ) {

            return res
            .status(400)
            .json({
                message:
                "Rating must be between 1 and 5"
            });
        }

        // Check if rating exists
        const [existingRating] =
        await db.query(
            `SELECT *
             FROM ratings
             WHERE user_id=?
             AND store_id=?`,
            [
                user_id,
                store_id
            ]
        );

        if (
            existingRating.length === 0
        ) {

            return res
            .status(404)
            .json({
                message:
                "No rating found"
            });
        }

        // Update rating
        await db.query(
            `UPDATE ratings
             SET rating=?
             WHERE user_id=?
             AND store_id=?`,
            [
                rating,
                user_id,
                store_id
            ]
        );

        res.status(200).json({
            message:
            "Rating Updated Successfully"
        });

    } catch (error) {

        console.log(
            "Update Rating Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};



// ====================
// SEARCH & FILTER STORES
// ====================
const searchStores = async (req, res) => {

    try {

        const {
            search = "",
            minRating,
            maxRating
        } = req.query;

        let query = `
            SELECT
                s.id,
                s.name,
                s.email,
                s.address,
                ROUND(AVG(r.rating),1) AS averageRating
            FROM stores s
            LEFT JOIN ratings r
            ON s.id = r.store_id
            WHERE 1=1
        `;

        let params = [];

        // Search by name/email/address
        if (search) {
            query += `
                AND (
                    s.name LIKE ?
                    OR s.email LIKE ?
                    OR s.address LIKE ?
                )
            `;
            params.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );
        }

        query += ` GROUP BY s.id `;

        // Rating filter (HAVING used for aggregate)
        if (minRating || maxRating) {
            query += ` HAVING 1=1 `;

            if (minRating) {
                query += ` AND averageRating >= ? `;
                params.push(minRating);
            }

            if (maxRating) {
                query += ` AND averageRating <= ? `;
                params.push(maxRating);
            }
        }

        const [stores] = await db.query(query, params);

        res.status(200).json(stores);

    } catch (error) {

        console.log("Search Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const bcrypt = require("bcryptjs");


// ====================
// UPDATE PASSWORD
// ====================
const updatePassword =
async (req, res) => {

    try {

        const bcrypt =
        require("bcryptjs");

        const user_id =
        req.user.id;

        const {
            oldPassword,
            newPassword
        } = req.body;

        // Get user
        const [users] =
        await db.query(
            `SELECT *
            FROM users
            WHERE id=?`,
            [user_id]
        );

        const user =
        users[0];

        // Check user exists
        if (!user) {

            return res
            .status(404)
            .json({
                message:
                "User not found"
            });
        }

        // Check old password
        const isMatch =
        await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {

            return res
            .status(400)
            .json({
                message:
                "Old Password Incorrect"
            });
        }

        // Hash new password
        const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        await db.query(
            `UPDATE users
            SET password=?
            WHERE id=?`,
            [
                hashedPassword,
                user_id
            ]
        );

        res.status(200).json({
            message:
            "Password Updated Successfully"
        });

    } catch (error) {

        console.log(
            "Update Password Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

module.exports = {
    getStores,
    submitRating,
    updateRating,
    searchStores,
    updatePassword
};