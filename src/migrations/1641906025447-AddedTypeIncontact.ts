import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTypeIncontact1641906025447 implements MigrationInterface {
    name = 'AddedTypeIncontact1641906025447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Contacts_relationship_enum" AS ENUM('Self', 'Spouse', 'Child', 'Child (Mother''s Insurance)', 'Child (Father''s Insurance)', 'Other', 'Grandparent', 'Grandchild', 'Nephew or Niece', 'Foster Child', 'Ward', 'Stepson or Stepdaughter', 'Stepson or Stepdaughter (Stepmother''s Insurance)', 'Stepson or Stepdaughter (Stepfather''s Insurance)', 'Employee', 'Unknown', 'Handicapped Dependent', 'Sponsored Dependent', 'Dependent of a Minor Dependent', 'Significant Other', 'Mother', 'Father', 'Emancipated Minor', 'Organ Donor', 'Cadaver Donor', 'Injured Plaintiff', 'Life partner')`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "relationship" "public"."Contacts_relationship_enum" NOT NULL DEFAULT 'Self'`);
        await queryRunner.query(`CREATE TYPE "public"."Contacts_contacttype_enum" AS ENUM('Self', 'Emergency', 'Next of Kin', 'Child (Mother''s Insurance)', 'guardian', 'gurantor')`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "contactType" "public"."Contacts_contacttype_enum" NOT NULL DEFAULT 'Self'`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" ADD "primaryProvider" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Staff" DROP COLUMN "primaryProvider"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "contactType"`);
        await queryRunner.query(`DROP TYPE "public"."Contacts_contacttype_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "relationship"`);
        await queryRunner.query(`DROP TYPE "public"."Contacts_relationship_enum"`);
    }

}
