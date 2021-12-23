const express = require("express");

const router = express.Router();

// Controller
const {
    addUser,
    getUsers,
    deleteUser,
    getUser,
    updateUser
} = require("../controllers/user");

const {
    addFund,
    updateFund,
    deleteFund,
    getFunds
} = require("../controllers/fund")

// Route User
router.post("/adduser", addUser);
router.get("/getusers", getUsers);
router.get("/getuser/:id", getUser);
router.delete("/deleteuser/:id", deleteUser);
router.delete("/deleteuser/:id", deleteUser);
router.put("/updateuser/:id", updateUser);

// route Fund
router.post("/addfund", addFund);
router.put("/updatefund/:id", updateFund);
router.delete("/deletefund/:id", deleteFund);
router.get("/getfunds", getFunds);

module.exports = router;