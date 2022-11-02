import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEnumInImagingOrder1667367788399 implements MigrationInterface {
    name = 'changeEnumInImagingOrder1667367788399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ALTER COLUMN "labTestStatus" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ALTER COLUMN "labTestStatus" SET NOT NULL`);
    }

}
