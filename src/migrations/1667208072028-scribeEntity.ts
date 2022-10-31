import {MigrationInterface, QueryRunner} from "typeorm";

export class scribeEntity1667208072028 implements MigrationInterface {
    name = 'scribeEntity1667208072028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Scribe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointmentId" uuid, CONSTRAINT "REL_a40fcf638b6fb452b39e2583b3" UNIQUE ("appointmentId"), CONSTRAINT "PK_b111d96a80f6134aa071cc6bab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Scribe" ADD CONSTRAINT "FK_a40fcf638b6fb452b39e2583b37" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Scribe" DROP CONSTRAINT "FK_a40fcf638b6fb452b39e2583b37"`);
        await queryRunner.query(`DROP TABLE "Scribe"`);
    }

}
