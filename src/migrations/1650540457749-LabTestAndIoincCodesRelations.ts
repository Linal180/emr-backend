// import {MigrationInterface, QueryRunner} from "typeorm";

// export class LabTestAndIoincCodesRelations1650540457749 implements MigrationInterface {
//     name = 'LabTestAndIoincCodesRelations1650540457749'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_2090bc39e00268af131d1b8b108"`);
//         await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_2090bc39e00268af131d1b8b108" FOREIGN KEY ("testId") REFERENCES "LoincCodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_2090bc39e00268af131d1b8b108"`);
//         await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_2090bc39e00268af131d1b8b108" FOREIGN KEY ("testId") REFERENCES "SpecimenTypes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//     }

// }
