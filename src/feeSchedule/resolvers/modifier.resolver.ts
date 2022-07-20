import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs, payloads
import { CreateModifierInput, FindAllModifierInput, GetModifierInput, RemoveModifierInput, UpdateModifierInput } from "../dto/modifiers.input";
import { AllModifiersPayload, ModifierPayload } from "../dto/modifiers-payload.dto";
//entity
import { Modifier } from "../entities/modifier.entity";
//services
import { ModifierService } from "../services/modifier.service";

@Resolver(() => Modifier)
export class ModifierResolver {
  constructor(private readonly modifierService: ModifierService) { }

  //Queries 

  @Query(() => AllModifiersPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllModifiers')
  async findAllModifiers(@Args('findAllModifierInput') findAllModifierInput: FindAllModifierInput): Promise<AllModifiersPayload> {
    const modifiers = await this.modifierService.findAllModifiers(findAllModifierInput);
    if (modifiers) {
      return {
        ...modifiers,
        response: {
          message: "OK", status: 200,
        }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Modifiers not found',
    });
  }


  @Query(() => ModifierPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getModifier')
  async getModifier(@Args('getModifierInput') getModifierInput: GetModifierInput): Promise<ModifierPayload> {
    return {
      modifier: await this.modifierService.findOne(getModifierInput),
      response: { status: 200, message: 'Modifier fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => ModifierPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createModifier')
  async createModifier(@Args('createModifierInput') createModifierInput: CreateModifierInput): Promise<ModifierPayload> {
    return {
      modifier: await this.modifierService.create(createModifierInput),
      response: { status: 200, message: 'Modifier created successfully' }
    };
  }

  @Mutation(() => ModifierPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeModifier')
  async removeModifier(@Args('removeModifierInput') removeModifierInput: RemoveModifierInput): Promise<ModifierPayload> {
    return {
      modifier: await this.modifierService.remove(removeModifierInput),
      response: { status: 200, message: 'Modifier deleted successfully' }
    };
  }

  @Mutation(() => ModifierPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateModifier')
  async updateModifier(@Args('updateModifierInput') updateModifierInput: UpdateModifierInput): Promise<ModifierPayload> {
    return {
      modifier: await this.modifierService.updateModifier(updateModifierInput),
      response: { status: 200, message: 'Modifier is updated successfully' }
    };
  }

}