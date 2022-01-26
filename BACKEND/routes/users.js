const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");


//update user
// PUT
//http://localhost:4000/api/users/61bb4781d98fa768130a1f22
// {
//     "userId":"1234",
//     "username":"usernameupdated",
//     "password":"password"
// }
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,  //ths will automatically set all inputs inside body
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});



//delete user
//delete
//http://localhost:3000/api/users/61bb254c145a6f39c3ee5adc
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//get a user
//GET
//http://localhost:4000/api/users/61dc01ef2227113648cd2c50
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        //console.log(user);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;

