import { Request, Response, NextFunction } from 'express';
import * as response from '../config/response';
import Customer from "../models/customer.model";
import * as setting from "../config/setting.config"

// sign-up
export const emailCheck = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body
    
    let check: any = await Customer.findOne({ email });

    if(!check) {
        next()
    } else {
        res.status(400).json(response.emailDuplicateError)
    }
}