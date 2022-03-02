import {MigrationInterface, QueryRunner} from "typeorm";

export class RolesAdded1646222773042 implements MigrationInterface {
    name = 'RolesAdded1646222773042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_fccafb49e66a53e21d0156239dc"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_48a9181c2205da141675124038e"`);
        await queryRunner.query(`ALTER TYPE "public"."Roles_role_enum" RENAME TO "Roles_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Roles_role_enum" AS ENUM('super-admin', 'admin', 'doctor', 'doctor-assistant', 'nurse-practitioner', 'office-manager', 'patient', 'nurse', 'billing', 'staff')`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" TYPE "public"."Roles_role_enum" USING "role"::"text"::"public"."Roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`DROP TYPE "public"."Roles_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_48a9181c2205da141675124038e" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_fccafb49e66a53e21d0156239dc" FOREIGN KEY ("scheduleId") REFERENCES "Schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_fccafb49e66a53e21d0156239dc"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_48a9181c2205da141675124038e"`);
        await queryRunner.query(`CREATE TYPE "public"."Roles_role_enum_old" AS ENUM('admin', 'billing', 'doctor', 'doctor-assistant', 'nurse', 'patient', 'staff', 'super-admin')`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" TYPE "public"."Roles_role_enum_old" USING "role"::"text"::"public"."Roles_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`DROP TYPE "public"."Roles_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Roles_role_enum_old" RENAME TO "Roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_48a9181c2205da141675124038e" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_fccafb49e66a53e21d0156239dc" FOREIGN KEY ("scheduleId") REFERENCES "Schedules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
