import { initSocket } from '../utils/socket';
import mongoose from "mongoose";

import { getGameList } from "../services/casino.services";

import CasinoList from "../models/casinoList.model";
import Currency from "../models/currency.model";
import Wallet from "../models/wallet.model";
import Favorite from '../models/favorite.model';

import data from '../config/data.json';

const mongoURL: string = String(process.env.mongoURL)

export async function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURL)
            .then(async () => {
                console.log("MongoDB connected!");

                CasinoList.exists({}).then(async (exists) => {
                    if (!exists) {
                        const gameList = await getGameList();
                        await CasinoList.insertMany(gameList);
                    }
                })

                Currency.exists({}).then(async (exists) => {
                    if (!exists) {
                        await Currency.insertMany(data.currency);
                    }
                })

                Wallet.exists({}).then(async (exists) => {
                    if (!exists) {
                        await Wallet.insertMany(data.wallet);
                    }
                })

                Favorite.exists({}).then(async (exists) => {
                    if (!exists) {
                        await Favorite.insertMany(data.favorite);
                    }
                })
                resolve('');
            })
            .catch((err) => {
                console.log(err)
                reject();
            });

    }
    )
}
