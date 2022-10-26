import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
//service
import { MacroService } from '../services/macro.service';
//entity
import { Macros } from '../entities/macro.entity';
//payload
import { MacroPayload, MacrosPayload } from '../dto/macros-payload.dto';
import { GetMacroInput, MacroPaginationInput } from '../dto/macros-input.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateMacroInput, RemoveMacroInput, UpdateMacroInput } from '../dto/create-macro.input';

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

  //mutations

  @Mutation(() => MacroPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createNdcCode')
  async createMacro(@Args('createMacroInput') createMacroInput: CreateMacroInput): Promise<MacroPayload> {
    return {
      macro: await this.macroService.create(createMacroInput),
      response: { status: 200, message: 'Macro created successfully.' }
    };
  }

  @Mutation(() => MacroPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateMacro')
  async updateMacro(@Args('updateMacroInput') updateMacroInput: UpdateMacroInput): Promise<MacroPayload> {
    return {
      macro: await this.macroService.update(updateMacroInput),
      response: { status: 200, message: 'Macro is updated successfully' }
    };
  }


  @Mutation(() => MacroPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeIcdCode')
  async removeMacro(@Args('removeMacroInput') removeMacroInput: RemoveMacroInput): Promise<MacroPayload> {
    const { id } = removeMacroInput
    return {
      macro: await this.macroService.remove(id),
      response: { status: 200, message: 'Macro is removed successfully' }
    };
  }
}
