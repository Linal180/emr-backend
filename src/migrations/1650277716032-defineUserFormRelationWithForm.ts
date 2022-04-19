import {MigrationInterface, QueryRunner} from "typeorm";

export class defineUserFormRelationWithForm1650277716032 implements MigrationInterface {
    name = 'defineUserFormRelationWithForm1650277716032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "formId" uuid`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD CONSTRAINT "FK_5993f6abe54ce49a0cebffa1f2c" FOREIGN KEY ("formId") REFERENCES "Forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP CONSTRAINT "FK_5993f6abe54ce49a0cebffa1f2c"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "formId"`);
    }

}
