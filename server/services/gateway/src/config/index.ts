export const config = {
    PORT: process.env.PORT || 8000,
    GRAPHQL_ENV: process.env.GRAPHQL_ENV || "development",
    PRODUCTS_HOST: process.env.PRODUCTS_HOST || "127.0.0.1",
    PRODUCTS_PORT: process.env.PRODUCTS_PORT || 8877,
    USERS_HOST: process.env.USERS_HOST || "127.0.0.1",
    USERS_PORT: process.env.USERS_PORT || 8876,
    ORDERS_HOST: process.env.ORDERS_HOST || "127.0.0.1",
    ORDERS_PORT: process.env.ORDERS_PORT || 8873
};
