
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Address {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
}

export interface User {
    id: string;
    name: string;
    password: string;
    seller: boolean;
    address: Address;
    created_at: DateTime;
}

export type DateTime = any;
