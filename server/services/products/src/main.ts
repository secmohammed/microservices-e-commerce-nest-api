import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { config } from "@commerce/shared";
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: config.PRODUCTS_HOST,
            port: parseInt(config.PRODUCTS_PORT as string)
        }
    });
    await app.listen(() =>
        console.log(`products module is listening on ${config.PRODUCTS_PORT}`)
    );
}
bootstrap();
