import { Document, model, Schema } from 'mongoose';

const casinoBetting = new Schema(
    {
        username: String,
        amount: {
            type: Number,
            default: 0
        },
        transaction: {
            type: Object
        }
    }
);

const CasinoBetting = model('CasinoBetting', casinoBetting);

export default CasinoBetting;
