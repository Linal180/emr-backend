import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllergyReactionsRelations1650006616890 implements MigrationInterface {
    name = 'PatientAllergyReactionsRelations1650006616890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PatientAllergyReactions" ("patientAllergiesId" uuid NOT NULL, "reactionsId" uuid NOT NULL, CONSTRAINT "PK_c6e3b6584c0cf1f042350a16fde" PRIMARY KEY ("patientAllergiesId", "reactionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3542da82ef8bfb336894ce49c0" ON "PatientAllergyReactions" ("patientAllergiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_68cfc51be22a7b2e081f7e1eab" ON "PatientAllergyReactions" ("reactionsId") `);
        await queryRunner.query(`ALTER TABLE "PatientAllergyReactions" ADD CONSTRAINT "FK_3542da82ef8bfb336894ce49c0c" FOREIGN KEY ("patientAllergiesId") REFERENCES "PatientAllergies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "PatientAllergyReactions" ADD CONSTRAINT "FK_68cfc51be22a7b2e081f7e1eab3" FOREIGN KEY ("reactionsId") REFERENCES "Reactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergyReactions" DROP CONSTRAINT "FK_68cfc51be22a7b2e081f7e1eab3"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergyReactions" DROP CONSTRAINT "FK_3542da82ef8bfb336894ce49c0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68cfc51be22a7b2e081f7e1eab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3542da82ef8bfb336894ce49c0"`);
        await queryRunner.query(`DROP TABLE "PatientAllergyReactions"`);
    }

}
