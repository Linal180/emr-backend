require('dotenv').config();
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnection, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DynamicClassEntity, TwilioInput } from './dto/dynamic-entity';
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

@Injectable()
export class UtilsService {
  constructor(
    private configService: ConfigService
  ) { }
  /**
    * Updates entity manager
    * @template T 
    * @param entity 
    * @param id 
    * @param attributes 
    * @param repository 
    * @returns entity manager 
    */
  async updateEntityManager<T>(entity: DynamicClassEntity<T>, id: string, attributes: QueryDeepPartialEntity<T>, repository: Repository<T>): Promise<T> {
    try {
      const update = await getConnection()
        .createQueryBuilder()
        .update(entity)
        .set({ ...attributes })
        .where("id = :id", { id })
        .execute();
      if (update.affected > 0) {
        return await repository.findOne(id);
      }

      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `${entity.name} Not found`,
      })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Generates string
   * @param length 
   * @returns  
   */
  async generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length-2;
    for ( let i = 0; i < 2; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result+Math.floor(100000 + Math.random() * 9000);
  }

  /**
   * Sms notification
   * @param twilioInput 
   */
  async smsNotification(twilioInput: TwilioInput) {
     return await client.messages.create({
       body: twilioInput.body,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: twilioInput.to
     });
  }

  /**
   * Sends verification code
   * @param phone 
   */
  async sendVerificationCode(phone: string) {
    try{
       client.verify.services(this.configService.get('TWILIO_OTP_SERVICE_SID')).verifications.create({ to: '+1'+phone, channel: "sms" })
    }catch (error) {
      throw new InternalServerErrorException(error);
    }
 }

 /**
  * Verifys otpcode
  * @param phone 
  * @param otpCode 
  * @returns  
  */
 async verifyOTPCode(phone: string, otpCode: string){
  try{
    const verification = await client.verify.services(this.configService.get('TWILIO_OTP_SERVICE_SID'))
    .verificationChecks
    .create({to: '+1'+phone, code: otpCode})
    if(verification && verification.status === 'approved') {
      return true
    }else {
      return false
    }
  }catch (error) {
    throw new InternalServerErrorException(error);
  }
 }
  /**
   * Converts tz
   * @param date 
   * @param tzString 
   * @returns  
   */
  async convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  }

  //generate invoive #
  async generateInvoiceNo() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length-2;
    for ( let i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${result}-${Math.floor(100000000 + Math.random() * 9000)}`;
  }
}
