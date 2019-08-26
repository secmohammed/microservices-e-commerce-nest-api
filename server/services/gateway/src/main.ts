import "dotenv/config";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import { config } from "./config";
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(config.PORT);
}
bootstrap();
