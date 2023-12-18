import { Document, model, Schema } from 'mongoose';

const casinoListSchema = new Schema(
    {
        langs: {
            ko: String
        },
        id: String,
        provider: String,
        rank: {
            type: Number,
            default: null,
        },
        thumbnail: String,
        thumbnailes: {
            "300x300": String
        },
        title: String,
        type: String,
        vendor: String,
        is_open: Boolean,
    }
);

const CasinoList = model('CasinoList', casinoListSchema);

export default CasinoList;
