const express = require('express')
const ControllerUser = require('../controllers/user/access')
const router = express.Router()
const passport = require('passport');

/*
 *
 */
router.post("/register", ControllerUser.register)
/*
    Returns the info about an user
 */
router.post("/login", ControllerUser.login)

// TODO patch could fail in some browsers
router.patch("/update",passport.authenticate('jwt',{session:false}),ControllerUser.update);

/*
 * Deletes de user with phone number :phone
 */
// TODO delete could fail in some browsers
router.delete("/delete/",passport.authenticate('jwt',{session:false}), ControllerUser.delete)

module.exports = router;