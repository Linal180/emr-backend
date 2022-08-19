import {MigrationInterface, QueryRunner} from "typeorm";

export class sexAtBirthMakeNullable1660818112520 implements MigrationInterface {
    name = 'sexAtBirthMakeNullable1660818112520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" SET NOT NULL`);
    }

}
