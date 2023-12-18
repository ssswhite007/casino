import { Document, model, Schema } from 'mongoose';

const customerDepositTransaction = new Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
        agentId: {
            type: Schema.Types.ObjectId,
            ref: 'Agent'
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        paymentMethodId: {
            type: Schema.Types.ObjectId,
            ref: 'PaymentMethod'
        },
        orderNumber: String,
        amount: Number,
        fee: Number,
        money: Number,
        bonus: Number,
        requestsAt: Date,
        responseAt: Date,
        note: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'cancel']
        },
        form: [
            {
                name: String,
                type: {
                    type: String,
                    enum: ['textarea', 'selectbox', 'radio', 'text']
                },
                value: String,
            }
        ]
    }
);

const CustomerDepositTransaction = model('CustomerDepositTransaction', customerDepositTransaction);

export default CustomerDepositTransaction;
