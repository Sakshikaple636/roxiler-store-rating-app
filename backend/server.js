const express =
require("express");

const cors =
require("cors");

const dotenv =
require("dotenv");

dotenv.config();

const app =
express();

// Routes
const authRoutes =
require(
"./routes/authRoutes"
);

const adminRoutes =
require(
"./routes/adminRoutes"
);

const userRoutes =
require(
"./routes/userRoutes"
);

const ownerRoutes =
require("./routes/ownerRoutes");

// Middleware
app.use(cors());
app.use(express.json());

app.use(
    "/api/owner",
    ownerRoutes
);

// Database
require("./config/db");

// Home
app.get("/", (
    req,
    res
) => {

    res.send(
        "Store Rating Backend Running"
    );
});

// Auth
app.use(
    "/api/auth",
    authRoutes
);

// Admin
app.use(
    "/api/admin",
    adminRoutes
);

// User
app.use(
    "/api/user",
    userRoutes
);

const PORT =
process.env.PORT || 5000;

app.listen(
    PORT,
    () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});