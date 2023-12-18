import { Document, model, Schema } from 'mongoose';

const agentSchema = new Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
        loginId: String,
        password: String,
        nickname: String,
        profileImage: {
            type: String,
            default: "https://storage.goodfriendszone.com/uploads/permanent/newbie.webp",
        },
        createAt: Date,
        lastLogin: Date,
        wallet: {
            type: Schema.Types.ObjectId,
            ref: 'Wallet'
        },
        managersId: {
            type: Schema.Types.ObjectId,
            ref: 'Managers',
        },
        path: String,
        code: String,
        info: {
            commissionMethod: Number,
            verify: {
                otp: Boolean
            }
        }
    }
);

const Agent = model('Agent', agentSchema);

export default Agent;
