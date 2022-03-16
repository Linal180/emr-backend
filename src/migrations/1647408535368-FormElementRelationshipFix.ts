import {MigrationInterface, QueryRunner} from "typeorm";

export class FormElementRelationshipFix1647408535368 implements MigrationInterface {
    name = 'FormElementRelationshipFix1647408535368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP CONSTRAINT "FK_4734f822dc6bdfe378d03d777f0"`);
        await queryRunner.query(`ALTER TABLE "FormElements" RENAME COLUMN "element8" TO "elementId"`);
        await queryRunner.query(`ALTER TABLE "Elements" RENAME COLUMN "8" TO "id"`);
        await queryRunner.query(`ALTER TABLE "Elements" RENAME CONSTRAINT "PK_0477d27de100696275c63d4407b" TO "PK_b981b06849ce04c768b261f08ba"`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD CONSTRAINT "FK_aa5e7061a0d3a5a8dd30b98757e" FOREIGN KEY ("elementId") REFERENCES "Elements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP CONSTRAINT "FK_aa5e7061a0d3a5a8dd30b98757e"`);
        await queryRunner.query(`ALTER TABLE "Elements" RENAME CONSTRAINT "PK_b981b06849ce04c768b261f08ba" TO "PK_0477d27de100696275c63d4407b"`);
        await queryRunner.query(`ALTER TABLE "Elements" RENAME COLUMN "id" TO "8"`);
        await queryRunner.query(`ALTER TABLE "FormElements" RENAME COLUMN "elementId" TO "element8"`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD CONSTRAINT "FK_4734f822dc6bdfe378d03d777f0" FOREIGN KEY ("element8") REFERENCES "Elements"("8") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
