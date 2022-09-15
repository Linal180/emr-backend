import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipFamilyHistoryAndPatient1663075866867 implements MigrationInterface {
    name = 'addRelationshipFamilyHistoryAndPatient1663075866867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistory" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "FamilyHistory" ADD CONSTRAINT "FK_cd4801c16adb971f9f975be75cc" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistory" DROP CONSTRAINT "FK_cd4801c16adb971f9f975be75cc"`);
        await queryRunner.query(`ALTER TABLE "FamilyHistory" DROP COLUMN "patientId"`);
    }

}
