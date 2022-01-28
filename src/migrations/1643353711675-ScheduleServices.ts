import {MigrationInterface, QueryRunner} from "typeorm";

export class ScheduleServices1643353711675 implements MigrationInterface {
    name = 'ScheduleServices1643353711675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ScheduleServices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "serviceId" uuid, "scheduleId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0b661bf953126e484f2c6631f34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_48a9181c2205da141675124038e" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_fccafb49e66a53e21d0156239dc" FOREIGN KEY ("scheduleId") REFERENCES "Schedules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_fccafb49e66a53e21d0156239dc"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_48a9181c2205da141675124038e"`);
        await queryRunner.query(`DROP TABLE "ScheduleServices"`);
    }

}
