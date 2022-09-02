import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAndPatientRelationship1641911516181 implements MigrationInterface {
    name = 'UserAndPatientRelationship1641911516181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD CONSTRAINT "UQ_7a6a5ab44fe595679b9bdd6e9e8" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD CONSTRAINT "FK_7a6a5ab44fe595679b9bdd6e9e8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP CONSTRAINT "FK_7a6a5ab44fe595679b9bdd6e9e8"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP CONSTRAINT "UQ_7a6a5ab44fe595679b9bdd6e9e8"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "userId"`);
    }

}
