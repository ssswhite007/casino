import { Document, model, Schema } from 'mongoose';

const rollingSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        requiredBetAmount: Number,
        currentBettingAmount: Number
    }
);

const Rolling = model('Rolling', rollingSchema);

export default Rolling;
