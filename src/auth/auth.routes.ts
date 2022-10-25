
const router=require('express').Router();

import auth_services from "./auth.services"

const { userAdd }=require('../users/user.services');


router.post("/register",userAdd)

router.post("/login",auth_services)

export default router;
