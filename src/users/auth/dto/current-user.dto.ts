export class CurrentUserInterface {
  email: string
  sub: string
  iat: number
  exp: number
  roles: string[]
}


export class CurrentUser2FaInterface {
  id: string
  iat: number
  exp: number
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetUserRequest {
  @Field()
  userId: string
}

