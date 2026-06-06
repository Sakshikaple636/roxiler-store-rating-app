const db =
require("../config/db");

// ====================
// Owner Dashboard
// ====================
const getOwnerDashboard =
async (req, res) => {

    try {

        const owner_id =
        req.user.id;

        const [stores] =
        await db.query(

            `SELECT
            s.id,
            s.name,

            ROUND(
                AVG(r.rating),
                1
            ) AS averageRating

            FROM stores s

            LEFT JOIN ratings r
            ON s.id =
            r.store_id

            WHERE s.owner_id=?

            GROUP BY s.id`,
            [owner_id]
        );

        res.status(200).json(
            stores
        );

    } catch (error) {

        console.log(
            "Owner Dashboard Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// View Ratings
// ====================
const getStoreRatings =
async (req, res) => {

    try {

        const owner_id =
        req.user.id;

        const [ratings] =
        await db.query(

            `SELECT
            s.name AS storeName,
            u.name AS userName,
            u.email,
            r.rating

            FROM ratings r

            JOIN users u
            ON r.user_id =
            u.id

            JOIN stores s
            ON r.store_id =
            s.id

            WHERE
            s.owner_id=?`,
            [owner_id]
        );

        res.status(200).json(
            ratings
        );

    } catch (error) {

        console.log(
            "Get Ratings Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

module.exports = {
    getOwnerDashboard,
    getStoreRatings
};