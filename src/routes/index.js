const { Router } = require("express");


const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;