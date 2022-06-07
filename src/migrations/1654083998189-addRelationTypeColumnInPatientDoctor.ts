import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationTypeColumnInPatientDoctor1654083998189 implements MigrationInterface {
    name = 'addRelationTypeColumnInPatientDoctor1654083998189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "otherRelation" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."DoctorPatients_relation_enum" AS ENUM('Preferred provider in practice', 'Backup provider in practice', 'Primary care provider', 'Referring provider', 'Other provider')`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "relation" "public"."DoctorPatients_relation_enum" NOT NULL DEFAULT 'Primary care provider'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "relation"`);
        await queryRunner.query(`DROP TYPE "public"."DoctorPatients_relation_enum"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "otherRelation"`);
    }

}
