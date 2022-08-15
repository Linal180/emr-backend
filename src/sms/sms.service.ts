import { Injectable, InternalServerErrorException } from "@nestjs/common";
//service
import { UtilsService } from "src/util/utils.service";
//inputs
import { SendSmsInput } from "./dto/sms.input";


@Injectable()
export class SmsService {
  constructor(private readonly utilsService: UtilsService) { }

  /**
   * Sends sms
   * @param params 
   * @returns  
   */
  async sendSms(params: SendSmsInput): Promise<string> {
    try {
      const response = await this.utilsService.smsNotification({ body: params.message, to: [params.to] })
      return `Sms is send successfully.`
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}