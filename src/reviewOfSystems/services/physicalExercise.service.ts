import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exercises } from "../entities/physicalTherapyExercise.entity";


@Injectable()
export class PhysicalExerciseServive {
    constructor(
        @InjectRepository(Exercises)
        private physicalExerciseRepo: Repository<Exercises>
    ) { }


    /**
     * Finds by template id
     * @param templateId 
     * @returns by template id 
     */
    async findByTemplateId(templateId: string): Promise<Exercises[]> {
        return await this.physicalExerciseRepo.find({ templateId })
    }


}