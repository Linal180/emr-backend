import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationshipTypeInContactTable1658476631101 implements MigrationInterface {
    name = 'changeRelationshipTypeInContactTable1658476631101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Contacts_relationship_enum" RENAME TO "Contacts_relationship_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Contacts_relationship_enum" AS ENUM('Self', 'Ward', 'Child', 'Other', 'Spouse', 'Friend', 'Mother', 'Parent', 'Father', 'Cousin', 'Unknown', 'Sibling', 'Employee', 'guardian', 'Grandchild', 'Organ Donor', 'Grandparent', 'Life partner', 'Foster Child', 'Cadaver Donor', 'Nephew or Niece', 'Emancipated Minor', 'Injured Plaintiff', 'Significant Other', 'Sponsored Dependent', 'Handicapped Dependent', 'Stepson or Stepdaughter', 'Child (Mother''s Insurance)', 'Child (Father''s Insurance)', 'Dependent of a Minor Dependent', 'Stepson or Stepdaughter (Stepmother''s Insurance)', 'Stepson or Stepdaughter (Stepfather''s Insurance)')`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" TYPE "public"."Contacts_relationship_enum" USING "relationship"::"text"::"public"."Contacts_relationship_enum"`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" SET DEFAULT 'Self'`);
        await queryRunner.query(`DROP TYPE "public"."Contacts_relationship_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Contacts_relationship_enum_old" AS ENUM('Cadaver Donor', 'Child', 'Child (Father''s Insurance)', 'Child (Mother''s Insurance)', 'Dependent of a Minor Dependent', 'Emancipated Minor', 'Employee', 'Father', 'Foster Child', 'Grandchild', 'Grandparent', 'Handicapped Dependent', 'Injured Plaintiff', 'Life partner', 'Mother', 'Nephew or Niece', 'Organ Donor', 'Other', 'Self', 'Significant Other', 'Sponsored Dependent', 'Spouse', 'Stepson or Stepdaughter', 'Stepson or Stepdaughter (Stepfather''s Insurance)', 'Stepson or Stepdaughter (Stepmother''s Insurance)', 'Unknown', 'Ward')`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" TYPE "public"."Contacts_relationship_enum_old" USING "relationship"::"text"::"public"."Contacts_relationship_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "relationship" SET DEFAULT 'Self'`);
        await queryRunner.query(`DROP TYPE "public"."Contacts_relationship_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Contacts_relationship_enum_old" RENAME TO "Contacts_relationship_enum"`);
    }

}
