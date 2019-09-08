import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { config } from "@commerce/shared";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    });
    await app.listen(() => console.log(`payments module is listening `));
    // stripe.charges
    //     .create({
    //         amount: 10000,
    //         currency: "usd",
    //         customer: "cus_Flokeye6LItio9",
    //         source: "card_1FGH6qEESCiXtnb4oV5fB9ur"
    //     })
    //     .then(charge => console.log(charge));
}
bootstrap();
