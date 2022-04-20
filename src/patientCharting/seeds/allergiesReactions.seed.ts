import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Allergies } from "../entities/allergies.entity";
import { Reactions } from "../entities/reactions.entity";
import { AllergiesData, ReactionsData } from './reactions-data';

@Injectable()
export class CreateAllergiesReactions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try { 
      //Check reactions  
      let reactions = await getRepository(Reactions).find();
      if (!reactions.length) {
        ReactionsData.map( async (item)=> { 
          let reaction = getRepository(Reactions).create(item)
          reaction = await queryRunner.manager.save(reaction);
        })
      }
       //Check allergies  
       let allergies = await getRepository(Allergies).find();
       if (!allergies.length) {
        AllergiesData.map( async (item)=> { 
           let allergy = getRepository(Allergies).create(item)
           allergy = await queryRunner.manager.save(allergy);
         })
       }
      await queryRunner.commitTransaction();
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}