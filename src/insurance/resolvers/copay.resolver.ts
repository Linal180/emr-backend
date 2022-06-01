import { Resolver, Args, Mutation, } from '@nestjs/graphql';
import { CopayInput } from '../dto/copay-input.dto';
import { Copay } from '../entities/copay.entity';
import { CopayService } from '../services/copay.service';

@Resolver(() => Copay)
export class CopayResolver {
  constructor(private readonly copayService: CopayService,
  ) { }

  @Mutation(() => Copay)
  createCopay(@Args('createCopayInput') createCopayInput: CopayInput): Promise<Copay> {
    return this.copayService.create(createCopayInput)
  }
}
