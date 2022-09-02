import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";


export const AwsProvider = {
  provide: 'AWS_S3',
  useFactory: async (configService: ConfigService) => {
    return new S3();
  },
  inject: [ConfigService],
}