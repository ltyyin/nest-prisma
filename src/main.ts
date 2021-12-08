import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

// 开启的服务端口
const listenPort = 5000;
const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启全局验证pipe
  app.useGlobalPipes(new ValidationPipe());

  /**
   * 配置 swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Nestjs-Prisma')
    .setDescription('测试nest和prisma一起使用')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(listenPort);
  logger.log(`listen in http://localhost:${listenPort}/api-docs`);
}
bootstrap();
