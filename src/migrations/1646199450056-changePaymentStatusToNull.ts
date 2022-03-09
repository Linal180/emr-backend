// import {MigrationInterface, QueryRunner} from "typeorm";

// export class changePaymentStatusToNull1646199450056 implements MigrationInterface {
//     name = 'changePaymentStatusToNull1646199450056'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentStatus" DROP NOT NULL`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentStatus" SET NOT NULL`);
//     }

// }
