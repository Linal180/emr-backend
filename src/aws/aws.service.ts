import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import { File } from "./dto/file-input.dto";

@Injectable()
export class AwsService {
  private Bucket: string;
  constructor(
    private readonly configService: ConfigService,
    @Inject('AWS_S3')
    private readonly s3Client: S3 // AWS s3 Client
  ) {
    this.Bucket = this.configService.get('AWS_BUCKET_NAME')
  }

  /**
   * Uploads file
   * @param file 
   * @returns file 
   */
  async uploadFile(file: File, moduleName: string, typeId: string): Promise<ManagedUpload.SendData> {
    try {
      const uploadedFile = await this.s3Client.upload({
        Bucket: `${this.Bucket}/${moduleName}/${typeId}`,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: `image/${file.originalname.split(".").slice(-1).pop()}`,
      }).promise()
      return uploadedFile
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes file
   * @param Key 
   * @returns file 
   */
  async removeFile(Key: string): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> {
    try {
      return await this.s3Client.deleteObject({
        Bucket: this.Bucket,
        Key
      }).promise()
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets file
   * @param Key 
   * @returns  
   */
  async getFile(Key: string) {
    try {
      return await this.s3Client.getSignedUrl('getObject', {
        Bucket: this.Bucket,
        Key,
        Expires: 100 //time to expire in seconds
      })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}