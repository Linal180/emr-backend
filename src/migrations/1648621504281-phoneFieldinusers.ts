import {MigrationInterface, QueryRunner} from "typeorm";

export class phoneFieldinusers1648621504281 implements MigrationInterface {
    name = 'phoneFieldinusers1648621504281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phone"`);
    }

}
