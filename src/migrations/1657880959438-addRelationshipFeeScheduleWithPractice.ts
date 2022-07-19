import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipFeeScheduleWithPractice1657880959438 implements MigrationInterface {
    name = 'addRelationshipFeeScheduleWithPractice1657880959438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "practiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD CONSTRAINT "FK_97af3534c5e1d2805726f799aa9" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP CONSTRAINT "FK_97af3534c5e1d2805726f799aa9"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "practiceId"`);
    }

}
