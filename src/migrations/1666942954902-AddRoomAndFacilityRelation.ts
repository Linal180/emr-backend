import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoomAndFacilityRelation1666942954902 implements MigrationInterface {
    name = 'AddRoomAndFacilityRelation1666942954902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_31206f2ac3875cbc3505f4ef442" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_31206f2ac3875cbc3505f4ef442"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "facilityId"`);
    }

}
