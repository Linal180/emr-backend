export class CurrentUserInterface {
  email: string
  sub: string
  iat: number
  exp: number
  roles: string[]
}


import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetUserRequest {
  @Field()
  userId: string
}

