import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffAndDoctorRelationship1647588246007 implements MigrationInterface {
    name = 'StaffAndDoctorRelationship1647588246007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "staffId" uuid`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD CONSTRAINT "FK_40773a32bdebc8847b3b7235e0c" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP CONSTRAINT "FK_40773a32bdebc8847b3b7235e0c"`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "staffId"`);
    }

}
