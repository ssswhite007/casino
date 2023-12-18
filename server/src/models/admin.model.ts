import { Document, model, Schema } from 'mongoose';

const adminSchema = new Schema(
    {
        parentId: {
            type: Number,
            default: null
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
        wallet: String,
        managersId: {
            type: Schema.Types.ObjectId,
            ref: 'Managers'
        },
        role: String,
        info: {
            commissionMethod: String,
            ggr_fee: {
                type: Number,
                default: null,
            },
            monthAmount: {
                type: Number,
                default: null
            },
            currencyId: {
                type: Schema.Types.ObjectId,
                ref: 'Currency',
            },
            apiKey: {
                type: String,
                default: null,
            },
            verify: {
                otp: Boolean
            }
        }
    }
);

const Admin = model('Admin', adminSchema);

export default Admin;
