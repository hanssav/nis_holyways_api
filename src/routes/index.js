const express = require("express");

const router = express.Router();

// Controller
const {
    addUser,
    getUsers,
    deleteUser,
    getUser,
    updateUser,
    getUsersByPayment,
    editUserDonate
} = require("../controllers/user");

const {
    addFund,
    updateFund,
    deleteFund,
    getFundsUserDonate,
    getFundsUserDonateOne
} = require("../controllers/fund")

const {
    addDonate,
    getDonate,
    getDonateFund,
    getDonates,
    updateDonate,
    deleteDonate
} = require("../controllers/payment")

const {
    register,
    login
} = require("../controllers/auth")

const { auth } = require("../../middlewares/auth")
const { uploadFile } = require("../../middlewares/uploadFile")

// Route User
router.post("/adduser", addUser);
router.get("/getusers", getUsers);
router.get("/getuser/:id", getUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);


router.put("/edituserdonate/:fundId/:userId", auth, editUserDonate); //req done
router.get("/getpaymentusers", getUsersByPayment); //

// route Fund
router.post("/addfund", auth ,uploadFile("image"), addFund); //req done
router.put("/updatefund/:id", auth, updateFund); //req done
router.delete("/deletefund/:id", auth, deleteFund); //req done

router.get("/getfundsuserdonateone/:id", getFundsUserDonateOne); // req done
router.get("/getfundsuserdonate", getFundsUserDonate); //req done

// route payment
router.post("/adddonate", addDonate);
router.get("/getdonates", getDonates);
router.get("/getdonate/:id", getDonate);
router.put("/updatedonate/:id", updateDonate);
router.delete("/deleteDonate/:id", deleteDonate)

router.get("/getdonatefund", getDonateFund);

// route auth
router.post("/register", register) //req done
router.post("/login", login) // req done


module.exports = router;