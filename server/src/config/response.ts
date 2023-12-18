import { Result, ResultEmailSendSuccess } from "../types/response.types"
import { EMAIL_VERIFICATION_TIME } from "./setting.config"

// success
export const emailSendSuccess: ResultEmailSendSuccess = {
    code: 1001,
    message: "Sent a auth code to your email.",
    timeout: EMAIL_VERIFICATION_TIME,
    key: "EMAIL_SUCCESS"
}

export const authCodeValidationSuccess: Result = {
    code: 1001,
    message: "AuthCode validation Successfully.",
    key: "AUTH_CODE_VALIDATION_SUCCESS"
}

export const signUpSuccess: Result = {
    code: 1000, 
    message: "Sign up successfully 🎉",
    key: "SIGN_UP_SUCCESS"
}

export const signInSuccess: Result = {
    code: 1002, 
    message: "Sign in successfully 🎉",
    key: "SIGN_IN_SUCCESS"
}

export const tokenRecreate: Result = {
    code: 1003,
    message: "Token Recreate",
    key: "TOKEN_RECREATE"
}

export const signOutSuccess: Result = {
    code: 1004,
    message: "Sign out successfully",
    key: "SIGN_OUT_SUCCESS"
}

export const passwordChangeSuccess: Result = {
    code: 1005,
    message: "Password change successfully",
    key: "PASSWORD_CHANGE_SUCCESS"
}

export const profileImageChangeSuccess: Result ={
    code: 1006,
    message: "Profile image change successfully",
    key: "PROFILE_IMAGE_CHANGE_SUCCESS"
}

export const nickChangeSuccess: Result ={
    code: 1007,
    message: "Nick change successfully",
    key: "NICK_CHANGE_SUCCESS"
}

export const createFavoriteSuccess: Result ={
    code: 1007,
    message: "Create Favorite successfully",
    key: "CREATE_FAVORITE_SUCCESS"
}

export const deleteFavoriteSuccess: Result ={
    code: 1007,
    message: "Delete Favorite successfully",
    key: "DELETE_FAVORITE_SUCCESS"
}


// Duplicate //
export const emailDuplicateError: Result = {
    code: 2001,
    message: "The email is a duplicate.",
    key: "EMAIL_DUPLICATE"
}

// invalid //

export const memberValidationError: Result = {
    code: 3005,
    message: "The email or password is incorrect.",
    key: "EMAIL_OR_PASSWORD_IS_INCORRECT"
} 

// failed
export const emailFailedSend: Result = {
    code: 4000,
    message: "Email sending failed, please try again.",
    key: "EMAIL_FAILED"
}

export const tokenVerificationFailed: Result = {
    code: 4001,
    message: "The token has expired.",
    key: "TOEKN_EXPIRED"    
}

export const ApiFailed: Result = {
    code: 4002,
    message: "The Api has been failed.",
    key: "API_FAILED"    
}

export const authCodeValidationError: Result = {
    code: 3003,
    message: "Invalid authentication code.",
    key: "AUTHCODE_INVALID"
}