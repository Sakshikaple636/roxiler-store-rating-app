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

        // Name Validation
if (
  name.length < 20 ||
  name.length > 60
) {
  return res.status(400).json({
    message:
      "Name must be between 20 and 60 characters"
  });
}

// Address Validation
if (
  address.length > 400
) {
  return res.status(400).json({
    message:
      "Address cannot exceed 400 characters"
  });
}

// Password Validation
const passwordRegex =
/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

if (
  !passwordRegex.test(password)
) {
  return res.status(400).json({
    message:
      "Password must be 8-16 characters and contain at least one uppercase letter and one special character"
  });
}
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

//=============
//Change Password
//========
const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (
            !currentPassword ||
            !newPassword
        ) {
            return res
            .status(400)
            .json({
                message:
                "All fields are required"
            });
        }

        const [users] =
        await db.query(
            "SELECT * FROM users WHERE id=?",
            [req.user.id]
        );

        if (
            users.length === 0
        ) {
            return res
            .status(404)
            .json({
                message:
                "User not found"
            });
        }

        const user = users[0];

        const isMatch =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res
            .status(400)
            .json({
                message:
                "Current password incorrect"
            });
        }

        // Password validation
        const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

        if (
            !passwordRegex.test(
                newPassword
            )
        ) {

            return res
            .status(400)
            .json({
                message:
                "Password must be 8-16 chars with uppercase and special character"
            });
        }

        const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            "UPDATE users SET password=? WHERE id=?",
            [
                hashedPassword,
                req.user.id
            ]
        );

        res.status(200).json({
            message:
            "Password updated successfully"
        });

    } catch (error) {

        console.log(
            "Change Password Error:",
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
    login,
    changePassword
};