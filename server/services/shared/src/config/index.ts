export const config = {
    JWT_TOKEN: process.env.JWT_TOKEN || "ondoqnwdonqdwq",
    JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || "7d",
    GATEWAY_PORT: process.env.GATEWAY_PORT || 8000,
    GATEWAY_HOST: process.env.GATEWAY_HOST || "127.0.0.1",
    APP_ENV: process.env.APP_ENV || "development",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_URL: process.env.REDIS_URL || "127.0.0.1",
    STRIPE_SECRET_KEY:
        process.env.STRIPE_SECRET_KEY || "sk_test_J29GVsb1mCVACXR6LIz1wrW7"
};
