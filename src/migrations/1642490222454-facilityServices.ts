import {MigrationInterface, QueryRunner} from "typeorm";

export class facilityServices1642490222454 implements MigrationInterface {
    name = 'facilityServices1642490222454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "price" character varying NOT NULL, "isActive" boolean DEFAULT true, "facilityId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Services" ADD CONSTRAINT "FK_f98d68b1b7214b4fd5c5c4e2e22" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Services" DROP CONSTRAINT "FK_f98d68b1b7214b4fd5c5c4e2e22"`);
        await queryRunner.query(`DROP TABLE "Services"`);
    }

}
