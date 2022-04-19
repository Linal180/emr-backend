import {MigrationInterface, QueryRunner} from "typeorm";

export class PaymentEntityNUllableTrue1650359685342 implements MigrationInterface {
    name = 'PaymentEntityNUllableTrue1650359685342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "doctorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "facilityId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "facilityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "doctorId" SET NOT NULL`);
    }

}
