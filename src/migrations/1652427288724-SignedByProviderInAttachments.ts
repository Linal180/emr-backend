import {MigrationInterface, QueryRunner} from "typeorm";

export class SignedByProviderInAttachments1652427288724 implements MigrationInterface {
    name = 'SignedByProviderInAttachments1652427288724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedByProvider" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedByProvider"`);
    }

}
