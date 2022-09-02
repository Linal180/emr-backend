import {MigrationInterface, QueryRunner} from "typeorm";

export class indexOnFacilityInPatientRemoved1642756032794 implements MigrationInterface {
    name = 'indexOnFacilityInPatientRemoved1642756032794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."patientId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "patientId" ON "Patients" ("userId") `);
    }

}
