import { Resolver } from "@nestjs/graphql";
//entity
import { Modifier } from "../entities/modifier.entity";
//services
import { ModifierService } from "../services/modifier.service";

@Resolver(() => Modifier)
export class ModifierResolver {
  constructor(private readonly modifierService: ModifierService) { }

}