
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CreatePaymentCard {
    token_id: string;
    last_four: string;
    provider_id: string;
    brand: string;
    default: boolean;
}

export interface CreateProduct {
    title: string;
    description: string;
    image: string;
    price: number;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface ProductInput {
    quantity: number;
    id: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    seller: boolean;
}

export interface UUID {
    id: string;
}

export interface Address {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface AuthToken {
    id: string;
    name: string;
    token: string;
}

export interface IMutation {
    createOrder(products: ProductInput[]): Order | Promise<Order>;
    deleteOrder(order: UUID): Order | Promise<Order>;
    createPaymentCard(data: CreatePaymentCard): PaymentCard | Promise<PaymentCard>;
    createChargeForUser(orderId: string): Order | Promise<Order>;
    deletePaymentCard(id: string): PaymentCard | Promise<PaymentCard>;
    createProduct(data: CreateProduct): Product | Promise<Product>;
    updateProduct(data: CreateProduct, id: string): Product | Promise<Product>;
    deleteProduct(id: string): Product | Promise<Product>;
    login(data: LoginUser): AuthToken | Promise<AuthToken>;
    register(data: RegisterUser): User | Promise<User>;
}

export interface Order {
    id: string;
    user: User;
    total_price: number;
    products: ProductWithQuantity[];
}

export interface PaymentCard {
    id: string;
    user: User;
    last_four: string;
    brand: string;
    default: boolean;
    provider_id: string;
    created_at: DateTime;
}

export interface Product {
    id: string;
    user: User;
    title: string;
    description: string;
    image: string;
    price: number;
    created_at: DateTime;
}

export interface ProductWithQuantity {
    product: Product;
    quantity_ordered: number;
}

export interface IQuery {
    orders(): Order[] | Promise<Order[]>;
    showOrder(id: string): Order | Promise<Order>;
    showPaymentCard(id: string): PaymentCard | Promise<PaymentCard>;
    indexUserPaymentCards(): PaymentCard[] | Promise<PaymentCard[]>;
    products(): Product[] | Promise<Product[]>;
    showProduct(id: string): Product | Promise<Product>;
    users(): User[] | Promise<User[]>;
    me(): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    seller: boolean;
    address?: Address;
    created_at: DateTime;
}

export type DateTime = any;
