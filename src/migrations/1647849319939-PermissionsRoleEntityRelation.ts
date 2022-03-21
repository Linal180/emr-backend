import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionsRoleEntityRelation1647849319939 implements MigrationInterface {
    name = 'PermissionsRoleEntityRelation1647849319939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "RolePermission" ("rolesId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_1d5670eba23d1b9052d2489b714" PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0ace98c3c814607c0e1652a250" ON "RolePermission" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d71a39a66632e463f7a0370b00" ON "RolePermission" ("permissionsId") `);
        await queryRunner.query(`ALTER TABLE "RolePermission" ADD CONSTRAINT "FK_0ace98c3c814607c0e1652a2502" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "RolePermission" ADD CONSTRAINT "FK_d71a39a66632e463f7a0370b009" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RolePermission" DROP CONSTRAINT "FK_d71a39a66632e463f7a0370b009"`);
        await queryRunner.query(`ALTER TABLE "RolePermission" DROP CONSTRAINT "FK_0ace98c3c814607c0e1652a2502"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d71a39a66632e463f7a0370b00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0ace98c3c814607c0e1652a250"`);
        await queryRunner.query(`DROP TABLE "RolePermission"`);
    }

}
