const db =
require("../config/db");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

// ====================
// Register
// ====================
const register =
async (req, res) => {

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

        if (
            existingUser.length > 0
        ) {

            return res
            .status(400)
            .json({
                message:
                "Email already exists"
            });
        }

        // Hash Password
        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        // Insert User
        await db.query(
            `INSERT INTO users
            (
                name,
                email,
                password,
                address,
                role
            )
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
            "User Registered Successfully"
        });

    } catch (error) {

        console.log(
            "Register Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

// ====================
// Login
// ====================
const login =
async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Find User
        const [user] =
        await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (
            user.length === 0
        ) {

            return res
            .status(404)
            .json({
                message:
                "User Not Found"
            });
        }

        // Compare Password
        const isMatch =
        await bcrypt.compare(
            password,
            user[0].password
        );

        if (!isMatch) {

            return res
            .status(400)
            .json({
                message:
                "Invalid Password"
            });
        }

        // Generate Token
        const token =
        jwt.sign(
            {
                id:
                user[0].id,

                role:
                user[0].role
            },

            process.env
            .JWT_SECRET,

            {
                expiresIn:
                "1d"
            }
        );

        res.status(200).json({

            token,

            user: {
                id:
                user[0].id,

                name:
                user[0].name,

                email:
                user[0].email,

                role:
                user[0].role
            }
        });

    } catch (error) {

        console.log(
            "Login Error:",
            error
        );

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};

module.exports = {
    register,
    login
};