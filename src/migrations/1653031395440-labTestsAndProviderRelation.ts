import {MigrationInterface, QueryRunner} from "typeorm";

export class labTestsAndProviderRelation1653031395440 implements MigrationInterface {
    name = 'labTestsAndProviderRelation1653031395440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_223f4425a603a0075319b29e0aa" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_223f4425a603a0075319b29e0aa"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "doctorId"`);
    }

}
