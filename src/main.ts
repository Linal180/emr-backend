import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { PatientModule } from './patients/patient.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  //swagger config
  const config = new DocumentBuilder()
    .setTitle('emr-pro')
    .setDescription('EMR API Endpoints')
    .setVersion('1.0')
    .addTag('EMR')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include:[PatientModule],
  });
  SwaggerModule.setup('api', app, document,);

  await app.listen(process.env.PORT);
}
bootstrap();
