import e, { Request, Response, NextFunction } from 'express';
import * as response from "../config/response"
import * as setting from '../config/setting.config';
import Favorite from "../models/favorite.model";
import Customer from "../models/customer.model";
import { AnyExpression } from 'mongoose';

export const createFavorite = async (req: Request, res: Response) => {
    const { email, gameId, type} = req.body

    const user: any = await Customer.findOne({
        email
    });

    if(!user) {
        res.status(400).json(response.ApiFailed);
        return;
    }

    const newFavorite = new Favorite({
       customerId: user._id,
       gameId,
       type 
    });
    await newFavorite.save();
    res.status(200).json(response.createFavoriteSuccess)
}

export const deleteFavorite = async (req: Request, res: Response) => {
    const { email, gameId, type} = req.body

    const user: any = await Customer.findOne({
        email
    });

    if(!user) {
        res.status(400).json(response.ApiFailed);
        return;
    }
    
    await Favorite.deleteMany({
        customerId: user._id,
        gameId,
        type
    });

    res.status(200).json(response.deleteFavoriteSuccess)
}