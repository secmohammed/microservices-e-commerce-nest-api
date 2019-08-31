import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { config } from "@commerce/shared";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: config.USERS_HOST,
            port: parseInt(config.USERS_PORT as string)
        }
    });
    await app.listen(() =>
        console.log(`users module is listening on ${config.USERS_PORT}`)
    );
}
bootstrap();
