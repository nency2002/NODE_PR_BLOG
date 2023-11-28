const {Router} = require('express');
const {  signdata, signuprender, loginrender, logindata } = require('../controllers/users.controllers');
const router = Router();

// signup
router.post("/signup" , signdata)
router.get("/signup" , signuprender)

// login
router
router.post("/login" , logindata)
router.get("/login" , loginrender)
module.exports=router

