import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Modifier } from 'src/feeSchedule/entities/modifier.entity';
import { ModifierService } from 'src/feeSchedule/services/modifier.service';
import { Repository } from 'typeorm';
import { Code } from '../entities/code.entity';

@Resolver(() => Code)
export class CodeResolver {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly modifierService: ModifierService
  ) { }

  @ResolveField(() => Modifier)
  async modifier1(@Parent() codes: Code): Promise<Modifier> {
    if (codes.m1) {
      return await this.modifierService.findModifierByCode(codes.m1)
    }
  }

  @ResolveField(() => Modifier)
  async modifier2(@Parent() codes: Code): Promise<Modifier> {
    if (codes.m2) {
      return await this.modifierService.findModifierByCode(codes.m2)
    }
  }

  @ResolveField(() => Modifier)
  async modifier3(@Parent() codes: Code): Promise<Modifier> {
    if (codes.m3) {
      return await this.modifierService.findModifierByCode(codes.m3)
    }
  }

  @ResolveField(() => Modifier)
  async modifier4(@Parent() codes: Code): Promise<Modifier> {
    if (codes.m4) {
      return await this.modifierService.findModifierByCode(codes.m4)
    }
  }
}
