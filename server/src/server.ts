import dotenv from 'dotenv';
import path from "path"
import https from 'https';
import http from 'http';
import fs from 'fs';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express()
let server
if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: path.resolve(__dirname, '../.env.production') });

    const options = {
        key: fs.readFileSync(
            "/etc/letsencrypt/live/server.powun.com/privkey.pem"
        ),
        cert: fs.readFileSync(
            "/etc/letsencrypt/live/server.powun.com/cert.pem"
        ),
        ca: fs.readFileSync(
            "/etc/letsencrypt/live/server.powun.com/chain.pem"
        ),

        requestCert: false,
        rejectUnauthorized: false,
    };
    server = https.createServer(options, app);

} else {
    dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

    server = http.createServer(app);
}

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    const contentTypes = ['bet', 'win', 'cancel', 'charge', 'adjust', 'promo_win', 'exceed_credit'];
    const contentType = req.get('Content-Type') || '';

    if (contentTypes.includes(contentType) && contentType !== 'application/json') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                req.body = JSON.parse(data);
                next();
            } catch (err) {
                res.status(400).send('Invalid JSON');
            }
        });
    } else {
        next();
    }
});

const allowedOriginsWithCredentials: string[] = [
    "http://localhost:9002",
    "http://127.0.0.1:9002",
    "http://localhost:9001",
    "http://127.0.0.1:9001",
    "http://localhost:10010",
    "https://demo.goodfriendsgaming.com",
    "http://localhost:5173"];

const allowedOriginsWithoutCredentials: string[] = [
    "45.76.148.155",
    "45.77.174.118",
    "127.0.0.1",
    "45.76.185.1",
    "45.77.248.182",
    "45.76.179.104",
    "45.76.179.39",
    "45.76.160.35",
    "52.74.15.8",
    "139.180.209.126",
    "https://backoffice.honorlink.org"];

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin: string | undefined = req.header('Origin');
    let corsOptions: CorsOptions;

    if (origin) {
        if (allowedOriginsWithCredentials.includes(origin)) {
            corsOptions = { origin: allowedOriginsWithCredentials, credentials: true };
        } else {
            corsOptions = { origin: allowedOriginsWithoutCredentials, credentials: false };
        }
    } else {
        corsOptions = { origin: false, credentials: false };
    }

    cors(corsOptions)(req, res, next);
});

// account
import accountRouter from "./routes/account.routes";
app.use("/api/account", accountRouter);

//casino
import casinoRouter from "./routes/casino.routes";
app.use("/api/casino", casinoRouter);

//favorite
import favoriteRouter from "./routes/favorite.routes";
app.use("/api/favorite", favoriteRouter);

import { connectDB } from './utils/dbconnect';
const port: number = Number(process.env.PORT)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });
});
