const db = require("../config/db");
const bcrypt = require("bcryptjs");

// ====================
// Add User
// ====================
const addUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        // Check existing user
        const [existingUser] =
        await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (existingUser.length > 0) {

            return res.status(400).json({
                message:
                "Email already exists"
            });
        }

        // Hash password
        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        // Insert user
        await db.query(
            `INSERT INTO users
            (name,email,password,address,role)
            VALUES(?,?,?,?,?)`,
            [
                name,
                email,
                hashedPassword,
                address,
                role
            ]
        );

        res.status(201).json({
            message:
            "User Added Successfully"
        });

    } catch (error) {

        console.log(
            "Add User Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Add Store
// ====================
const addStore = async (req, res) => {

    try {

        const {
            name,
            email,
            address,
            owner_id
        } = req.body;

        // Check existing store
        const [existingStore] =
        await db.query(
            "SELECT * FROM stores WHERE email=?",
            [email]
        );

        if (existingStore.length > 0) {

            return res.status(400).json({
                message:
                "Store already exists"
            });
        }

        // Insert store
        await db.query(
            `INSERT INTO stores
            (name,email,address,owner_id)
            VALUES(?,?,?,?)`,
            [
                name,
                email,
                address,
                owner_id
            ]
        );

        res.status(201).json({
            message:
            "Store Added Successfully"
        });

    } catch (error) {

        console.log(
            "Add Store Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Dashboard
// ====================
const getDashboard = async (
    req,
    res
) => {

    try {

        const [users] =
        await db.query(
            `SELECT COUNT(*) AS totalUsers
            FROM users`
        );

        const [stores] =
        await db.query(
            `SELECT COUNT(*) AS totalStores
            FROM stores`
        );

        const [ratings] =
        await db.query(
            `SELECT COUNT(*) AS totalRatings
            FROM ratings`
        );

        res.status(200).json({

            totalUsers:
            users[0].totalUsers,

            totalStores:
            stores[0].totalStores,

            totalRatings:
            ratings[0].totalRatings
        });

    } catch (error) {

        console.log(
            "Dashboard Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Get All Users
// ====================
const getAllUsers = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            address,
            role
        } = req.query;

        let query =
        `SELECT
        id,
        name,
        email,
        address,
        role
        FROM users
        WHERE 1=1`;

        let values = [];

        // Search by Name
        if (name) {

            query +=
            " AND name LIKE ?";

            values.push(
                `%${name}%`
            );
        }

        // Search by Email
        if (email) {

            query +=
            " AND email LIKE ?";

            values.push(
                `%${email}%`
            );
        }

        // Search by Address
        if (address) {

            query +=
            " AND address LIKE ?";

            values.push(
                `%${address}%`
            );
        }

        // Filter by Role
        if (role) {

            query +=
            " AND role=?";

            values.push(role);
        }

        const [users] =
        await db.query(
            query,
            values
        );

        res.status(200).json(
            users
        );

    } catch (error) {

        console.log(
            "Get Users Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

//=============
// Get All Stores
//=========================
    const getAllStores = async (
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
// Export Functions
// ====================
module.exports = {
    addUser,
    addStore,
    getDashboard,
    getAllUsers,
    getAllStores
};