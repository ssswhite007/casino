import express, { Router, Request, Response } from 'express';
import * as controllers from "../controllers/account.controllers";
import * as middlewares from "../middlewares/account.middlewares";

const router: Router = express.Router();

// social sign-up
router.post("/social/sign-up", middlewares.emailCheck, controllers.socialSignUp)

// sign-in
router.post('/sign-in', controllers.signIn)
router.post('/sign-in/success', controllers.signInSuccess)
router.post('/sign-in/refresh', controllers.refresh)

// sign-out
router.post('/sign-out', controllers.signOut)

// profile
router.post("/profile/image", controllers.changeProfileImage)
router.post("/profile/nick", controllers.changeNick)

// email
router.post('/email', controllers.sendEmail);

// auth code check
router.post('/auth-code', controllers.authCodeCheck);

// balance
router.get("/balance", controllers.getBalance)
export default router;