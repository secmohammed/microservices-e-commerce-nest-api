import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { config } from "@commerce/shared";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: config.ORDERS_HOST,
            port: parseInt(config.ORDERS_PORT as string)
        }
    });
    await app.listen(() =>
        console.log(`orders module is listening on ${config.ORDERS_PORT}`)
    );
}
bootstrap();
