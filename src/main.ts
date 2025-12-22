import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true , transform: true}));

const  config = new DocumentBuilder()
    .setTitle('Trello')
    .setDescription('Trello-like API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
const doc = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, doc);

await app.listen(process.env.PORT || 3000);
console.log('Listening on', process.env.PORT || 3000);
}
bootstrap();
