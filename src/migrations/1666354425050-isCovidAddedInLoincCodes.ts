import {MigrationInterface, QueryRunner} from "typeorm";

export class isCovidAddedInLoincCodes1666354425050 implements MigrationInterface {
    name = 'isCovidAddedInLoincCodes1666354425050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LoincCodes" ADD "isCovid" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LoincCodes" DROP COLUMN "isCovid"`);
    }

}
