import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipCvxAndCptCode1665581331998 implements MigrationInterface {
    name = 'addRelationshipCvxAndCptCode1665581331998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" ADD "cptCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD CONSTRAINT "FK_2128158ffcc80d37be502603b66" FOREIGN KEY ("cptCodeId") REFERENCES "CPTCodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP CONSTRAINT "FK_2128158ffcc80d37be502603b66"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "cptCodeId"`);
    }

}
