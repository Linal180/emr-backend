import {MigrationInterface, QueryRunner} from "typeorm";

export class indexOnUserInPatient1642754974378 implements MigrationInterface {
    name = 'indexOnUserInPatient1642754974378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_7a6a5ab44fe595679b9bdd6e9e" ON "Patients" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7a6a5ab44fe595679b9bdd6e9e"`);
    }

}
