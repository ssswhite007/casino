import { Document, model, Schema } from 'mongoose';

const walletSchema = new Schema(
    {
        currencyId: {
            type: Schema.Types.ObjectId,
            ref: 'Currency'
        },
        money: Number,
        balance: Number
    }
);

const Wallet = model('Wallet', walletSchema);

export default Wallet;
