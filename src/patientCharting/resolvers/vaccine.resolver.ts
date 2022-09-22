import { Resolver } from "@nestjs/graphql";
//entities
import { Vaccine } from "../entities/vaccines.entity";
//services
import { VaccineService } from "../services/vaccine.service";

@Resolver(() => Vaccine)
export class VaccineResolver {
  constructor(
    private readonly vaccineService: VaccineService,) { }
}
