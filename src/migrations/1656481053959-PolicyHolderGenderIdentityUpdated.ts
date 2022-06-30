import {MigrationInterface, QueryRunner} from "typeorm";

export class PolicyHolderGenderIdentityUpdated1656481053959 implements MigrationInterface {
    name = 'PolicyHolderGenderIdentityUpdated1656481053959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."policyHolder_sex_enum" RENAME TO "policyHolder_sex_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."policyHolder_sex_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Decline to specify', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" TYPE "public"."policyHolder_sex_enum" USING "sex"::"text"::"public"."policyHolder_sex_enum"`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."policyHolder_sex_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."policyHolder_sex_enum_old" AS ENUM('Choose not to disclose', 'Gender non-conforming (neither exclusively male nor female)', 'Identifies as Female', 'Identifies as Male', 'Transgender Female/Male-to-Female (MTF)', 'Transgender Male/Female-to-Male (FTM)')`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" TYPE "public"."policyHolder_sex_enum_old" USING "sex"::"text"::"public"."policyHolder_sex_enum_old"`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ALTER COLUMN "sex" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."policyHolder_sex_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."policyHolder_sex_enum_old" RENAME TO "policyHolder_sex_enum"`);
    }

}
