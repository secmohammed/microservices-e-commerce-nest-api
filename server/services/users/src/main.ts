import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.USERS_HOST,
            port: parseInt(process.env.USERS_PORT)
        }
    });
    await app.listen(() =>
        console.log(`users module is listening on ${process.env.USERS_PORT}`)
    );
}
bootstrap();
