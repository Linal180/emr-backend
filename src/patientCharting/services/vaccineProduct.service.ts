import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// entities
import { VaccineProduct } from "../entities/vaccineProduct.entity";

export class VaccineService {
  constructor(
    @InjectRepository(VaccineProduct)
    private vaccineProductRepo: Repository<VaccineProduct>,
  ) { }

  
}