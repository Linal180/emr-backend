import { Field, InputType } from '@nestjs/graphql';
import { ServiceType } from '../entities/services.entity';

@InputType()
export class CreateServiceInput {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  duration: string;

  @Field({ nullable: false })
  price: string;

  @Field({ nullable: false })
  color: string;

  @Field({ nullable: false })
  facilityId: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field(type => ServiceType, { description: 'Service type', nullable: true })
  serviceType?: ServiceType;


}