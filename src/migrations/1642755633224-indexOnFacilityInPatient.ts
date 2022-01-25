import {MigrationInterface, QueryRunner} from "typeorm";

export class indexOnFacilityInPatient1642755633224 implements MigrationInterface {
    name = 'indexOnFacilityInPatient1642755633224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "patientId" ON "Patients" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."patientId"`);
    }

}
