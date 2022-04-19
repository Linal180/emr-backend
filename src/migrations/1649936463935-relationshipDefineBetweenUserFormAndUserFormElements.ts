import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipDefineBetweenUserFormAndUserFormElements1649936463935 implements MigrationInterface {
    name = 'relationshipDefineBetweenUserFormAndUserFormElements1649936463935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ADD "userFormId" uuid`);
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ADD CONSTRAINT "FK_a1ae412f681556e94db41cad4b4" FOREIGN KEY ("userFormId") REFERENCES "UsersForms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" DROP CONSTRAINT "FK_a1ae412f681556e94db41cad4b4"`);
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" DROP COLUMN "userFormId"`);
    }

}
