import {MigrationInterface, QueryRunner} from "typeorm";

export class indexOnFacilityInPatientRemoved1642755559926 implements MigrationInterface {
    name = 'indexOnFacilityInPatientRemoved1642755559926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7a6a5ab44fe595679b9bdd6e9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab44def5ad019cc825036dcf8c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_ab44def5ad019cc825036dcf8c" ON "Patients" ("facilityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a6a5ab44fe595679b9bdd6e9e" ON "Patients" ("userId") `);
    }

}
