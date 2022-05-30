import {MigrationInterface, QueryRunner} from "typeorm";

export class doctorAndPolicyRelation1653566501732 implements MigrationInterface {
    name = 'doctorAndPolicyRelation1653566501732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ADD "referringProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "policies" ADD "primaryCareProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "policies" ADD CONSTRAINT "FK_2b3d96bc5237987a274676d56ef" FOREIGN KEY ("referringProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "policies" ADD CONSTRAINT "FK_659c46faf8bae850bb75c097b13" FOREIGN KEY ("primaryCareProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" DROP CONSTRAINT "FK_659c46faf8bae850bb75c097b13"`);
        await queryRunner.query(`ALTER TABLE "policies" DROP CONSTRAINT "FK_2b3d96bc5237987a274676d56ef"`);
        await queryRunner.query(`ALTER TABLE "policies" DROP COLUMN "primaryCareProviderId"`);
        await queryRunner.query(`ALTER TABLE "policies" DROP COLUMN "referringProviderId"`);
    }

}
