import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffRelationWithUsers1641381144405 implements MigrationInterface {
    name = 'StaffRelationWithUsers1641381144405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Staff_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "Staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying, "dob" character varying, "phone" character varying, "mobile" character varying, "gender" "Staff_gender_enum" NOT NULL DEFAULT 'male', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_fcc18a004d0d6c80c4b34bdad7" UNIQUE ("userId"), CONSTRAINT "PK_9ab06d37f3877439b4361d1bf78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD CONSTRAINT "FK_fcc18a004d0d6c80c4b34bdad75" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" DROP CONSTRAINT "FK_fcc18a004d0d6c80c4b34bdad75"`);
        await queryRunner.query(`DROP TABLE "Staff"`);
        await queryRunner.query(`DROP TYPE "Staff_gender_enum"`);
    }

}
