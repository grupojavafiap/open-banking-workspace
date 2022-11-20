import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const logger = new Logger();

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'bank-transmitter';
    app.setGlobalPrefix(globalPrefix);

    app.enableCors();
    
    app.useGlobalPipes(new ValidationPipe());
    
    const config = new DocumentBuilder()
    .setTitle('Bank Transmitter - Consents API')
    .setDescription('API de Consentimento - Open Banking')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);


    const port = process.env.PORT || 3333;
    await app.listen(port);
    logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
