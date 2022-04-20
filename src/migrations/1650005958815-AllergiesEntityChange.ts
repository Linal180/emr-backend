import {MigrationInterface, QueryRunner} from "typeorm";

export class AllergiesEntityChange1650005958815 implements MigrationInterface {
    name = 'AllergiesEntityChange1650005958815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Allergies" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Allergies" ALTER COLUMN "name" SET NOT NULL`);
    }

}
