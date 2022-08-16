
import { Args, Mutation, Resolver } from "@nestjs/graphql";
//inputs
import { SendSmsInput } from "./dto/sms.input";
//payload
import { SmsPayload } from "./dto/sms.payload";
//service
import { SmsService } from "./sms.service";

@Resolver('sms')
export class SmsResolver {
  constructor(private readonly smsService: SmsService) { }

  @Mutation(() => SmsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'sendSms')
  async sendSms(@Args('sendSmsInput') sendSmsInput: SendSmsInput): Promise<SmsPayload> {
    return {
      sms: await this.smsService.sendSms(sendSmsInput),
      response: { status: 200, message: 'Sms is sent successfully.' }
    };
  }
}