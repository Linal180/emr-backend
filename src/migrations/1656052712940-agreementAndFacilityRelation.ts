import {MigrationInterface, QueryRunner} from "typeorm";

export class agreementAndFacilityRelation1656052712940 implements MigrationInterface {
    name = 'agreementAndFacilityRelation1656052712940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Agreements" ADD CONSTRAINT "FK_2d19a98df930354600bdb9ceb8a" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" DROP CONSTRAINT "FK_2d19a98df930354600bdb9ceb8a"`);
        await queryRunner.query(`ALTER TABLE "Agreements" DROP COLUMN "facilityId"`);
    }

}
