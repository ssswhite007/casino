import express, { Router, Request, Response } from 'express';
import * as controllers from "../controllers/casino.controllers";

const router: Router = express.Router();

// casino-list
router.get("/list", controllers.getList)

// casino-info
router.get("/info", controllers.getInfo)

// casino-launch
router.get("/launch", controllers.launch)

// casino Vendors & Types
router.get("/vendor", controllers.getVendors)
router.get("/type", controllers.getTypes)

// balance
router.get("/balance", controllers.getBalance)
router.post("/balance", controllers.updateBalance)
router.post("/changeBalance", controllers.changeBalance)

export default router;