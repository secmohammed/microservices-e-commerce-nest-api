import "dotenv/config";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { GraphQLErrorFilter } from "./filters/graphql-error.filter";
import { ValidationPipe } from "./pipes/validation.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new GraphQLErrorFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8000);
}
bootstrap();
