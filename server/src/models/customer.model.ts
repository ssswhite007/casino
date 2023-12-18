import { Document, model, Schema } from 'mongoose';

const customerSchema = new Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
        email: String,
        password: String,
        nickname: String,
        level: {
            type: Number,
            default: 0,
        },
        profileImage: {
            type: String,
            default: "https://storage.goodfriendszone.com/uploads/permanent/newbie.webp",
        },
        createAt: Date,
        lastLogin: Date,
        currencyId: {
            type: Schema.Types.ObjectId,
            ref: 'Currency',
            default: null
        },
        info: {
            verify: {
                phoneNumber: {
                    type: Boolean,
                    default: false,
                },
                email: {
                    type: Boolean,
                    default: false
                }
            },
            phoneNumber: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            agentId: {
                type: Schema.Types.ObjectId,
                ref: 'Agent',
                default: null,
            }
        },
        walletId: [{
            type: Schema.Types.ObjectId,
            ref: 'Wallet',
            default: null
        }],
        ban: {
            chatBan: {
                date: Date,
                reason: String,
            },
            accessBan: {
                date: Date,
                reason: String,
            }
        }
    }
);

const Customer = model('Customer', customerSchema);

export default Customer;
