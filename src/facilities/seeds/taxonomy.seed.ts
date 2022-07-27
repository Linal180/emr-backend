import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Taxonomy } from "../entities/taxonomy.entity";
import { TaxonomyData } from "./seed-data";

@Injectable()
export class CreateTaxonomies implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Document Types  
      await Promise.all(TaxonomyData.map(async (item) => {
        const getTaxonomy = await getRepository(Taxonomy).findOne({ code: item.code })
        if (!getTaxonomy) {
          let taxonomy = getRepository(Taxonomy).create(item)
          taxonomy = await queryRunner.manager.save(taxonomy);
        }
      }))
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