import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedssType1645612836892 implements MigrationInterface {
    name = 'RemovedssType1645612836892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "ssnType"`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_ssntype_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Doctors_ssntype_enum" AS ENUM('OASDI', 'Tanf', 'Medicare', 'medicaid')`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "ssnType" "public"."Doctors_ssntype_enum" NOT NULL DEFAULT 'medicaid'`);
    }

}
