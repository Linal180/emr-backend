import {MigrationInterface, QueryRunner} from "typeorm";

export class indexOnFacilityInPatient1642755021662 implements MigrationInterface {
    name = 'indexOnFacilityInPatient1642755021662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_ab44def5ad019cc825036dcf8c" ON "Patients" ("facilityId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ab44def5ad019cc825036dcf8c"`);
    }

}
