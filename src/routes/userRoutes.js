const { Router } = require("express");
const UserController = require("../controllers/user");
const Authentication = require("../middlewares/auth");

const router = Router();


const { createUser, loginUser, updateUser } = UserController;
const { verifyToken } = Authentication;

router.post("/register",  createUser);
router.post("/login", loginUser);


router.patch("/update/:id", verifyToken, updateUser);


module.exports = router;