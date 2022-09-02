import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorPatientRelationTypeChanged1657092273586 implements MigrationInterface {
    name = 'DoctorPatientRelationTypeChanged1657092273586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."DoctorPatients_relation_enum" RENAME TO "DoctorPatients_relation_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."DoctorPatients_relation_enum" AS ENUM('Preferred provider in practice', 'Rendering provider in practice', 'Primary care provider', 'Referring provider', 'Ordering provider', 'Other provider')`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" TYPE "public"."DoctorPatients_relation_enum" USING "relation"::"text"::"public"."DoctorPatients_relation_enum"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" SET DEFAULT 'Primary care provider'`);
        await queryRunner.query(`DROP TYPE "public"."DoctorPatients_relation_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."DoctorPatients_relation_enum_old" AS ENUM('Backup provider in practice', 'Ordering provider', 'Other provider', 'Preferred provider in practice', 'Primary care provider', 'Referring provider')`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" TYPE "public"."DoctorPatients_relation_enum_old" USING "relation"::"text"::"public"."DoctorPatients_relation_enum_old"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ALTER COLUMN "relation" SET DEFAULT 'Primary care provider'`);
        await queryRunner.query(`DROP TYPE "public"."DoctorPatients_relation_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."DoctorPatients_relation_enum_old" RENAME TO "DoctorPatients_relation_enum"`);
    }

}
