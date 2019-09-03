import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { config } from "@commerce/shared";
// import { stripe } from "./utils/stripe";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    });
    await app.listen(() => console.log(`payments module is listening `));
    // user inserts his payment card at the frontend form ( pass the other data of this user as a second parameter such as address, name etc..).
    // stripe api sends us a token to our website.
    // we deliver this token alongside with the rest of the response to our server.
    // we store that to the payment methods table alongside the token we got from stripe.
    // create a customer using the stripe token, and pass data like email,name etc.. we collected earlier on register.
    //  we can attach the payment_method_id for more info.
    // we can charge the user for whatever he bought in cents using the stripe token/ payment_method_id and optionally the customer associated to this charge.

    // stripe.customers
    //     .create({
    //         email: "foo-customer@example.com"
    //     })
    //     .then(customer => {
    //         console.log(customer);
    //         return stripe.customers.createSource(customer.id, {
    //             source: "tok_visa"
    //         });
    //     })
    //     .then(source => {
    //         console.log(source.customer);
    //         return stripe.charges.create({
    //             amount: 1600,
    //             currency: "usd",
    //             customer: source.customer as string
    //         });
    //     });
}
bootstrap();
