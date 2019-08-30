import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.PRODUCTS_HOST,
            port: parseInt(process.env.PRODUCTS_PORT as string)
        }
    });
    await app.listen(() => console.log("products module is listening"));
}
bootstrap();
