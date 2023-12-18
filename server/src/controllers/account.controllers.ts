import express, { Request, Response } from 'express';
import * as response from "../config/response"
import Customer from "../models/customer.model";
import AuthCode from "../models/authCode.model";
import jwt, { JwtPayload } from "jsonwebtoken"
import * as utils from "../utils/library"
import * as setting from "../config/setting.config"
import * as nodemailer from "../utils/nodemailer"

// common
export const sendEmail = async (req: Request, res: Response) => {
    const { email } = req.body
    const authCode: string = utils.generateRandomCode(5)
    try {
        const newAuthCode = new AuthCode({
            code: authCode,
            reg_date: new Date(),
            is_used: false
        });
        await newAuthCode.save();

        await nodemailer.sendEmail(email, `Please enter your verification code. ${authCode}`)
        res.status(200).json(response.emailSendSuccess)
    } catch (error) {
        res.status(400).json(response.emailFailedSend)
    }
}

export const authCodeCheck = async (req: Request, res: Response) => {
    const { authCode } = req.body

    console.log(new Date(new Date().getTime() - setting.EMAIL_VERIFICATION_TIME * 60000))
    const check = await AuthCode.findOne(
        {
            code: authCode,
            reg_date: { $gte: new Date(new Date().getTime() - setting.EMAIL_VERIFICATION_TIME * 60000) },
            is_used: false
        }
    )

    if (check) {
        res.status(200).json(response.authCodeValidationSuccess)
        await AuthCode.updateOne({
            code: authCode,
            is_used: false
        }, {
            $set: {
                is_used: true
            }
        })
    } else {
        res.status(400).json(response.authCodeValidationError)
    }
}

export const socialSignUp = async (req: Request, res: Response) => {
    const { admin_idx, email, password } = req.body

    const nick: string = `user${utils.generateRandomNumber(10)}`;
    const newCustomer = new Customer({
        adminId: admin_idx,
        email,
        password: utils.hashWithSHA256(password),
        nickname: nick,
        createAt: new Date()
    });

    let userData = await newCustomer.save();
    if (userData)
        res.status(200).json(response.signUpSuccess)
    else {
        res.status(400).json(response.ApiFailed)
    }
}

// sign-in
export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body

    let data: any = await Customer.findOne({ email, password: utils.hashWithSHA256(password) });
    if (data) {
        const accessToken = jwt.sign(data.toJSON(), String(process.env.ACCESS_SECRET), { expiresIn: "1m", issuer: data.email });
        const refreshToken = jwt.sign(data.toJSON(), String(process.env.REFRESH_SECRET), { expiresIn: "1h", issuer: data.email });

        res.cookie('accessToken', accessToken, {
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? 'strict' : 'lax'
        })
        res.cookie('refreshToken', refreshToken, {
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? 'strict' : 'lax'
        })

        await Customer.updateOne({ email }, {
            $set: {
                lastLogin: new Date()
            }
        });
        res.status(200).json(response.signInSuccess)
    } else {
        res.status(400).json(response.memberValidationError)
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const token: any = req.cookies.refreshToken;
        const data = jwt.verify(token, String(process.env.REFRESH_SECRET)) as JwtPayload;

        let userData: any = await Customer.findOne({ email: data.email, password: data.password });
        const accessToken = jwt.sign(userData.toJSON(), String(process.env.ACCESS_SECRET), { expiresIn: "1m", issuer: data.email })
        const refreshToken = jwt.sign(userData.toJSON(), String(process.env.REFRESH_SECRET), { expiresIn: "1h", issuer: data.email })

        res.cookie('accessToken', accessToken, {
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? 'strict' : 'lax'
        })
        res.cookie('refreshToken', refreshToken, {
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? 'strict' : 'lax'
        })
        res.status(200).json(response.tokenRecreate)

    } catch (error) {
        res.status(400).json(response.tokenVerificationFailed)
    }
}

export const signInSuccess = async (req: Request, res: Response) => {
    try {
        const token: any = req.cookies.accessToken
        const data = jwt.verify(token, String(process.env.ACCESS_SECRET)) as JwtPayload
        let userData: any = await Customer.findOne({ email: data.email, password: data.password });
        const { password, createAt, lastLogin, ...others } = userData.toJSON()
        res.status(200).json(others)

    } catch (error) {
        res.status(400).json(response.tokenVerificationFailed)
    }
}

// sign-out
export const signOut = (req: Request, res: Response) => {
    try {
        res.cookie("accessToken", "");
        res.cookie("refreshToken", "");
        res.status(200).json(response.signOutSuccess)
    } catch (error) {
        res.status(400).json(error)
    }
}

// profile
export const changeProfileImage = async (req: Request, res: Response) => {
    const { customerIdx, profileImage } = req.body

    await Customer.updateOne({ _id: customerIdx }, {
        $set: {
            profileImage
        }
    });

    res.status(200).json(response.profileImageChangeSuccess)
}

export const changeNick = async (req: Request, res: Response) => {
    const { customerIdx, nick } = req.body

    await Customer.updateOne({ _id: customerIdx }, {
        $set: {
            nickname: nick
        }
    });

    res.status(200).json(response.nickChangeSuccess)
}

export const getBalance = async (req: Request, res: Response) => {
}