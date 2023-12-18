import { string } from 'joi';
import { Document, model, Schema } from 'mongoose';

const paymentMethodSchema = new Schema(
    {
        currencyId: {
            type: Schema.Types.ObjectId,
            ref: 'Currency'
        },
        name: String,
        logo: String,
        transactionPerFee: Number,
        feePerTransaction: Number,
        min: Number,
        max: Number,
        form: [
            {
                name: String,
                type: String,
            }
        ]
    }
);

const PaymentMethod = model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;
