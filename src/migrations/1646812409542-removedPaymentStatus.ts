// import {MigrationInterface, QueryRunner} from "typeorm";

// export class removedPaymentStatus1646812409542 implements MigrationInterface {
//     name = 'removedPaymentStatus1646812409542'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "paymentStatus"`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "Appointments" ADD "paymentStatus" character varying`);
//     }

// }
