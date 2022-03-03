import {MigrationInterface, QueryRunner} from "typeorm";

export class locationLinkFieldInContacts1646306609535 implements MigrationInterface {
    name = 'locationLinkFieldInContacts1646306609535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" RENAME COLUMN "bookingNumber" TO "appointmentNumber"`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD "locationLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP COLUMN "locationLink"`);
        await queryRunner.query(`ALTER TABLE "Appointments" RENAME COLUMN "appointmentNumber" TO "bookingNumber"`);
    }

}
