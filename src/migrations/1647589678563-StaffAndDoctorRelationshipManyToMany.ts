import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffAndDoctorRelationshipManyToMany1647589678563 implements MigrationInterface {
    name = 'StaffAndDoctorRelationshipManyToMany1647589678563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP CONSTRAINT "FK_40773a32bdebc8847b3b7235e0c"`);
        await queryRunner.query(`CREATE TABLE "doctorStaff" ("doctorsId" uuid NOT NULL, "staffId" uuid NOT NULL, CONSTRAINT "PK_302eec68e355df2cafbe09f5297" PRIMARY KEY ("doctorsId", "staffId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12770caa52e6af0687f2ae12e3" ON "doctorStaff" ("doctorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd5b3612c8b0674ba4ed600259" ON "doctorStaff" ("staffId") `);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "staffId"`);
        await queryRunner.query(`ALTER TABLE "doctorStaff" ADD CONSTRAINT "FK_12770caa52e6af0687f2ae12e3e" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctorStaff" ADD CONSTRAINT "FK_fd5b3612c8b0674ba4ed6002598" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctorStaff" DROP CONSTRAINT "FK_fd5b3612c8b0674ba4ed6002598"`);
        await queryRunner.query(`ALTER TABLE "doctorStaff" DROP CONSTRAINT "FK_12770caa52e6af0687f2ae12e3e"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "staffId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd5b3612c8b0674ba4ed600259"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12770caa52e6af0687f2ae12e3"`);
        await queryRunner.query(`DROP TABLE "doctorStaff"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD CONSTRAINT "FK_40773a32bdebc8847b3b7235e0c" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
