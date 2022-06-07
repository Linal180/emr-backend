import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { DocumentType } from "../entities/documentType.entity";
import { DocumentTypesData } from "./seed-data";

@Injectable()
export class CreateDocumentTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Document Types  
      await Promise.all(DocumentTypesData.map(async (item) => {
        const getDocumentType = await getRepository(DocumentType).findOne({ type: item.type })
        if (!getDocumentType) {
          let documentType = getRepository(DocumentType).create(item)
          documentType = await queryRunner.manager.save(documentType);
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