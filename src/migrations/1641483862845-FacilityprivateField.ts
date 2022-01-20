import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityprivateField1641483862845 implements MigrationInterface {
    name = 'FacilityprivateField1641483862845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "isPrivate" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "isPrivate"`);
    }

}
