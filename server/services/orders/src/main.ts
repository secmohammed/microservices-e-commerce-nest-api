import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.ORDERS_HOST,
            port: parseInt(process.env.ORDERS_PORT)
        }
    });
    await app.listen(() =>
        console.log(`orders module is listening on ${process.env.ORDERS_PORT}`)
    );
}
bootstrap();
