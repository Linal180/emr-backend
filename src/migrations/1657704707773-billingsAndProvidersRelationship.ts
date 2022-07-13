import {MigrationInterface, QueryRunner} from "typeorm";

export class billingsAndProvidersRelationship1657704707773 implements MigrationInterface {
    name = 'billingsAndProvidersRelationship1657704707773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "servicingProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "renderingProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_7a774b4d35784a1042fcbf8c8d8" FOREIGN KEY ("servicingProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_d348da5d94c83139c55f0f267c3" FOREIGN KEY ("renderingProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_d348da5d94c83139c55f0f267c3"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_7a774b4d35784a1042fcbf8c8d8"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "renderingProviderId"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "servicingProviderId"`);
    }

}
