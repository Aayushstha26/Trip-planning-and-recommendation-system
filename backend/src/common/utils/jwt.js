import jwt from "jsonwebtoken";

const getAccessTokenSecret = () => {
    return process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "default_access_token_secret";
};

const getRefreshTokenSecret = () => {
    return process.env.REFRESH_SECRET_KEY || (process.env.JWT_SECRET ? `${process.env.JWT_SECRET}_refresh` : "default_refresh_secret_key");
};

export const generateAccessToken = (payload) => {
    const secret = getAccessTokenSecret();
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || "15m";
    return jwt.sign(payload, secret, { expiresIn });
};

export const generateRefreshToken = (payload) => {
    const secret = getRefreshTokenSecret();
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRY || "7d";
    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyAccessToken = (token) => {
    const secret = getAccessTokenSecret();
    return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token) => {
    const secret = getRefreshTokenSecret();
    return jwt.verify(token, secret);
};
