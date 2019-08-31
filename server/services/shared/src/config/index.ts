export const config = {
    JWT_TOKEN: process.env.JWT_TOKEN || "ondoqnwdonqdwq",
    JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || "7d",
    GATEWAY_PORT: process.env.GATEWAY_PORT || 8000,
    GATEWAY_HOST: process.env.GATEWAY_HOST || "127.0.0.1",
    GRAPHQL_ENV: process.env.GRAPHQL_ENV || "development",
    PRODUCTS_HOST: process.env.PRODUCTS_HOST || "127.0.0.1",
    PRODUCTS_PORT: process.env.PRODUCTS_PORT || 8877,
    USERS_HOST: process.env.USERS_HOST || "127.0.0.1",
    USERS_PORT: process.env.USERS_PORT || 8876,
    ORDERS_HOST: process.env.ORDERS_HOST || "127.0.0.1",
    ORDERS_PORT: process.env.ORDERS_PORT || 8873
};
