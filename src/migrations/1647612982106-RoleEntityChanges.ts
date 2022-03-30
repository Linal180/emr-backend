import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleEntityChanges1647612982106 implements MigrationInterface {
    name = 'RoleEntityChanges1647612982106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."Roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "Roles" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."Roles_role_enum" AS ENUM('admin', 'billing', 'doctor', 'doctor-assistant', 'nurse', 'nurse-practitioner', 'office-manager', 'patient', 'staff', 'super-admin')`);
        await queryRunner.query(`ALTER TABLE "Roles" ADD "role" "public"."Roles_role_enum" NOT NULL DEFAULT 'admin'`);
    }

}
