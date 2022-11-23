import {MigrationInterface, QueryRunner} from "typeorm";

export class PhysicalExerciseTable1669185540237 implements MigrationInterface {
    name = 'PhysicalExerciseTable1669185540237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Exercises"`);
    }

}
