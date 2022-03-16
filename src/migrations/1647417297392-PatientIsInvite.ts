import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientIsInvite1647417297392 implements MigrationInterface {
    name = 'PatientIsInvite1647417297392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "inviteAccepted" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "inviteAccepted"`);
    }

}
