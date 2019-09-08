import * as Stripe from "stripe";
import { config } from "@commerce/shared";
export const stripe = new Stripe(config.STRIPE_SECRET_KEY);
