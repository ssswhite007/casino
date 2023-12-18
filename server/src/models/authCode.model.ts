import { Document, model, Schema } from 'mongoose';

const authCodeSchema = new Schema(
    {
        code: String,
        reg_date: Date,
        is_used: Boolean
    }
);

const AuthCode = model('AuthCode', authCodeSchema);

export default AuthCode;
