import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { Modifier } from "../entities/modifier.entity";


@Injectable()
export class ModifierService {
	constructor(@InjectRepository(Modifier) private modifierRepository: Repository<Modifier>,) { }


}