import e, { Request, Response, NextFunction } from 'express';
import * as response from "../config/response"
import * as setting from '../config/setting.config';
import CasinoList from "../models/casinoList.model";
import Customer from '../models/customer.model';
import CasinoBetting from '../models/casinoBetting.model';
import Wallet from '../models/wallet.model';
import { getGameList } from "../services/casino.services";
import axios from "axios";
import { AnyExpression } from 'mongoose';

// list
export const getList = async (req: Request, res: Response) => {
    try {
        const title: any = req.query.title;
        const type: any = req.query.type;
        let page: any = req.query.page;
        const sort: any = req.query.sort;
        let limit: any = req.query.limit;
        const email: any = req.query.email;

        limit = parseInt(limit);
        page = parseInt(page);

        const pipeline: any = [];

        // Match stage
        const matchStage: any = {};
        if (title && title !== '') {
            matchStage.title = { $regex: new RegExp(title, 'i') };
        }
        if (type && type !== '') {
            matchStage.type = { $eq: type };
        }
        pipeline.push({ $match: matchStage });

        // Add Field
        pipeline.push({
            $addFields: {
                rank: {
                    $ifNull: ['$rank', 9999]
                }
            }
        });


        // favorite
        pipeline.push(
            {
                $lookup: {
                    from: "favorites",
                    localField: "id",
                    foreignField: "gameId",
                    as: "favorites",
                    pipeline: [
                        {
                            $lookup: {
                                from: "customers",
                                localField: "customerId",
                                foreignField: "_id",
                                as: "customers"
                            }
                        },
                        {
                            $unwind: "$customers"
                        },
                        {
                            $match: {
                                "customers.email": email
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$favorites",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    favorites: {
                        $cond: {
                            if: { $eq: [{ $type: "$favorites" }, "object"] },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        );

        // Sort stage
        let facetData = [], sortStage;
        if (sort && sort === 'rank') {
            sortStage = { rank: 1 };
            facetData.push({ $sort: sortStage });
        }

        // Skip && Limit
        facetData.push({ $skip: page * limit }, { $limit: limit });

        pipeline.push({
            $facet: {
                "totalCount": [{ $count: "total_count" }],
                "data": facetData,
            }
        });

        pipeline.push({ $unwind: "$totalCount" });
        pipeline.push({
            $project: {
                total_count: "$totalCount.total_count",
                data: 1
            }
        });



        const filteredList: any = await CasinoList.aggregate(pipeline).exec();

        res.status(200).json({
            list: filteredList.length > 0 ? filteredList[0].data : [],
            totalNumber: filteredList.length > 0 ? filteredList[0].total_count : 0,
            limit: limit
        })
    } catch (error: any) {
        console.log("getList", error)
    }
}

export const getBalance = async (req: Request, res: Response) => {
    const username = req.query.username;

    const wallet: any = await Customer.aggregate([
        {
            $match: {
                $and: [
                    {
                        email: {
                            $eq: username,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$walletId",
        },
        {
            $lookup: {
                from: "wallets",
                let: {
                    "walletId": "$walletId",
                    "currencyId": "$currencyId"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$currencyId", "$$currencyId"]
                                    },
                                    {
                                        $eq: ["$_id", "$$walletId"]
                                    }
                                ]
                            }
                        }
                    }, {
                        $lookup: {
                            from: "currencies",
                            localField: "currencyId",
                            foreignField: "_id",
                            as: "currency"
                        }
                    }, {
                        $unwind: "$currency",
                    }
                ],
                as: "wallet"
            }
        },
        {
            $unwind: "$wallet",
        }, {
            $project: {
                wallet: 1
            }
        }
    ]).exec();

    if (wallet.length == 0)
        res.status(400).json(response.ApiFailed)
    else {
        res.status(200).json({
            balance: wallet[0].wallet.balance
        })

        // const api_key = process.env.EXCHANGE_API_KEY ? process.env.EXCHANGE_API_KEY : '0';
        // const result = await axios.get(`https://api.coinlayer.com/convert?access_key=${api_key}&from=${wallet[0].wallet.currency.name}&to=KRW&amount=1`);
        // console.log(result.data.info.rate * wallet[0].wallet.money)
    }
}

export const changeBalance = async (req: Request, res: Response) => {
    const { username, amount, transaction } = req.body

    const newCasinoBetting = new CasinoBetting({
        username, amount, transaction
    });

    await newCasinoBetting.save();
    
    res.status(200).json({
        balance: transaction.target.balance
    })

}

export const updateBalance = async (req: Request, res: Response) => {
    const { username } = req.body;

    const wallet: any = await Customer.aggregate([
        {
            $match: {
                $and: [
                    {
                        email: {
                            $eq: username,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$walletId",
        },
        {
            $lookup: {
                from: "wallets",
                let: {
                    "walletId": "$walletId",
                    "currencyId": "$currencyId"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$currencyId", "$$currencyId"]
                                    },
                                    {
                                        $eq: ["$_id", "$$walletId"]
                                    }
                                ]
                            }
                        }
                    }, {
                        $lookup: {
                            from: "currencies",
                            localField: "currencyId",
                            foreignField: "_id",
                            as: "currency"
                        }
                    }, {
                        $unwind: "$currency",
                    }
                ],
                as: "wallet"
            }
        },
        {
            $unwind: "$wallet",
        }, {
            $project: {
                wallet: 1
            }
        }
    ]).exec();

    if (wallet.length == 0)
        res.status(400).json(response.ApiFailed)
    else {

        const api_key = process.env.EXCHANGE_API_KEY ? process.env.EXCHANGE_API_KEY : '0';
        const result = await axios.get(`https://api.coinlayer.com/convert?access_key=${api_key}&from=${wallet[0].wallet.currency.name}&to=KRW&amount=1`);

        await Wallet.updateOne({
            _id: wallet[0].wallet._id
        }, {
            $set: {
                balance: result.data.info.rate * wallet[0].wallet.money
            }
        });

        res.status(400).json({
            balance: result.data.info.rate * wallet[0].wallet.money
        })
    }
}

export const getInfo = async (req: Request, res: Response) => {
    try {
        const id: any = req.query.id;

        const data: any = await CasinoList.findOne({ _id: id });

        res.status(200).json({
            title: data.title,
            type: data.type
        })
    } catch (error: any) {
        console.log("getList", error)
    }
}

export const launch = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    const nick: any = req.query.nick;

    const data: any = await CasinoList.findOne({ _id: id });

    const endpoint: string = `https://api.honorlink.org/api/game-launch-link?username=${nick}&nickname=devel&game_id=${data.id}&vendor=${data.vendor}`;
    const apiKey: string = process.env.HONORLINK_API_KEY!;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    const apiData = await axios.get(endpoint, { headers });
    res.status(200).json({
        link: apiData.data.link
    })
}

export const getTypes = async (req: Request, res: Response) => {
    const typeList = await CasinoList.aggregate([
        {
            $group: {
                "_id": "$type",
            }
        },
        {
            $project: {
                "_id": 0,
                "title": "$_id"
            }
        }
    ]);
    res.status(200).json({
        data: typeList
    })
}

export const getVendors = async (req: Request, res: Response) => {
    const vendorList = await CasinoList.aggregate([
        {
            $group: {
                "_id": "$vendor",
            }
        },
        {
            $project: {
                "_id": 0,
                "title": "$_id"
            }
        }
    ]);
    res.status(200).json({
        data: vendorList
    })
}