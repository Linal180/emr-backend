import {MigrationInterface, QueryRunner} from "typeorm";

export class patientAndPolicyHolderRelation1653565882222 implements MigrationInterface {
    name = 'patientAndPolicyHolderRelation1653565882222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "policyHolderId" uuid`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD CONSTRAINT "FK_d9a703b9979f70a7b7332b06ccd" FOREIGN KEY ("policyHolderId") REFERENCES "policyHolder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP CONSTRAINT "FK_d9a703b9979f70a7b7332b06ccd"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "policyHolderId"`);
    }

}
