import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { Vaccine } from "../entities/vaccines.entity";


export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccineRepo: Repository<Vaccine>) { }

  async findAll() {

  }

  async findOne() {

  }


  async create() {

  }


  async update() {

  }

  async del() {

  }

}