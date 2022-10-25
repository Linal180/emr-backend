import { Resolver, Query, Args } from '@nestjs/graphql';
//service
import { MacroService } from '../services/macro.service';
//entity
import { Macros } from '../entities/macro.entity';
//payload
import { MacroPayload, MacrosPayload } from '../dto/macros-payload.dto';
import { GetMacroInput, MacroPaginationInput } from '../dto/macros-input.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';

@Resolver(() => Macros)
export class MacroResolver {
  constructor(private readonly macroService: MacroService) { }

  @Query(() => MacrosPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchAllMacros')
  async fetchAllMacros(@Args('macroInput') macroInput: MacroPaginationInput): Promise<MacrosPayload> {
    const macros = await this.macroService.findAll(macroInput)

    return {
      ...macros,
      response: { status: 200, message: 'Macros data fetched successfully' }
    }
  }
  
  @Query(() => MacroPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchMacro')
  async getMacro(@Args('getMacroInput') getMacroInput: GetMacroInput): Promise<MacroPayload> {
    const { id } = getMacroInput;
    const macro = await this.macroService.findOne(id)
    if (!macro) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Macro not found',
      });
    }
    return {
      macro,
      response: { status: 200, message: "Macro is fetch successfully." }
    };
  }
}
