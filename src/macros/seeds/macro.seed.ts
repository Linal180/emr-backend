import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TemplateType } from "src/lib/constants";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//entities
import { Macros } from '../entities/macro.entity';
//seed data
import { textMacrosData } from "./seed-data";

//class
@Injectable()
export class CreateMacros implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const macroRepo = getRepository(Macros)
      const macros = await macroRepo.find();
      if (!macros.length) {
        for (let index = 0; index < textMacrosData.length; index++) {
          const macro = textMacrosData[index];
          const {
            expansion, shortcut, providers
          } = macro || {}
          const macroObj = macroRepo.create({
            expansion,
            providers,
            systematic: true,
            section: [TemplateType.HPI, TemplateType.REVIEW_OF_SYSTEM, TemplateType.PHYSICAL_EXAM],
            shortcut
          })

          const savedMacroObj = await queryRunner.manager.save(macroObj);
        }
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