import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionsAndRolesRelations1647863786451 implements MigrationInterface {
    name = 'PermissionsAndRolesRelations1647863786451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "RolePermissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isMutable" boolean DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "permissionId" uuid, "roleId" uuid, CONSTRAINT "PK_29cf5edaa365f1e090b95eb6708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ADD CONSTRAINT "FK_2c2887cb39b3141958851e6fbdc" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ADD CONSTRAINT "FK_5bc4baf52e29432973ac9ebf90a" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RolePermissions" DROP CONSTRAINT "FK_5bc4baf52e29432973ac9ebf90a"`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" DROP CONSTRAINT "FK_2c2887cb39b3141958851e6fbdc"`);
        await queryRunner.query(`DROP TABLE "RolePermissions"`);
    }

}
