import express, { Router, Request, Response } from 'express';
import * as controllers from "../controllers/favorite.controllers";

const router: Router = express.Router();

router.post("/create", controllers.createFavorite)
router.post("/delete", controllers.deleteFavorite)

export default router;