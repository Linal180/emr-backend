import {MigrationInterface, QueryRunner} from "typeorm";

export class FormElementRelationship1647408394275 implements MigrationInterface {
    name = 'FormElementRelationship1647408394275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "formId" uuid`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "element8" uuid`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD CONSTRAINT "FK_583dd52a2917a22d1bdc6dce3b0" FOREIGN KEY ("formId") REFERENCES "Forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD CONSTRAINT "FK_4734f822dc6bdfe378d03d777f0" FOREIGN KEY ("element8") REFERENCES "Elements"("8") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP CONSTRAINT "FK_4734f822dc6bdfe378d03d777f0"`);
        await queryRunner.query(`ALTER TABLE "FormElements" DROP CONSTRAINT "FK_583dd52a2917a22d1bdc6dce3b0"`);
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "element8"`);
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "formId"`);
    }

}
