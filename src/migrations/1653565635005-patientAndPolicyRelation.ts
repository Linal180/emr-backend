import {MigrationInterface, QueryRunner} from "typeorm";

export class patientAndPolicyRelation1653565635005 implements MigrationInterface {
    name = 'patientAndPolicyRelation1653565635005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "policies" ADD CONSTRAINT "FK_8effa087b0efb5807b94ff6c82d" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" DROP CONSTRAINT "FK_8effa087b0efb5807b94ff6c82d"`);
        await queryRunner.query(`ALTER TABLE "policies" DROP COLUMN "patientId"`);
    }

}
