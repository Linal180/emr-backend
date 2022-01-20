import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndRoles1641284303018 implements MigrationInterface {
    name = 'userAndRoles1641284303018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Roles_role_enum" AS ENUM('super-admin', 'admin', 'doctor', 'patient', 'nurse', 'billing', 'staff')`);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "Roles_role_enum" NOT NULL DEFAULT 'admin', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "Users_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "Users_status_enum" NOT NULL DEFAULT '1', "emailVerified" boolean DEFAULT false, "password" character varying NOT NULL, "email" character varying NOT NULL, "inviteSentAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "inviteAcceptedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" character varying, "token" character varying, "userType" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "Users_status_enum"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TYPE "Roles_role_enum"`);
    }

}
