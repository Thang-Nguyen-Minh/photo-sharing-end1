const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRoute");
const PhotoRouter = require("./routes/PhotoRoute");
const AuthRouter = require("./routes/AuthRoute");
const NewPhotoRouter = require("./routes/NewPhotoRoute");
const app = express();
const PORT = process.env.PORT || 8080;

// Connect MongoDB
dbConnect();

// Middlewares
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

// Session middleware setup (MUST be before routes)
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);

// Static file serving (if you use image uploads)
app.use("/images", express.static(path.join(__dirname+"/images")))

// Route Mounting - versioned under /api
app.use("/admin", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/photos", NewPhotoRouter)
// Base test route
app.get("/", (req, res) => {
    res.send({ message: "Hello from photo-sharing app API!" });
});

// Server start
app.listen(PORT, () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
});
