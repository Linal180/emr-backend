import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationAppointmentAndRoom1667382755281 implements MigrationInterface {
    name = 'addRelationAppointmentAndRoom1667382755281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "roomId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_ae8fe8cf362c9364955d5aa8549" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_ae8fe8cf362c9364955d5aa8549"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "roomId"`);
    }

}
