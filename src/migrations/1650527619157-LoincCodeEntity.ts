import {MigrationInterface, QueryRunner} from "typeorm";

export class LoincCodeEntity1650527619157 implements MigrationInterface {
    name = 'LoincCodeEntity1650527619157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LoincCodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loincNum" character varying, "component" character varying, "property" character varying, "timeAspect" character varying, "system" character varying, "scaleTyp" character varying, "methodTyp" character varying, "class" character varying, "versionLastChanged" character varying, "chngType" character varying, "definitionDescription" character varying, "status" character varying, "consumerName" character varying, "classType" character varying, "formula" character varying, "exmplAnswers" character varying, "surveyQuestTest" character varying, "surveyQuestSRC" character varying, "unitsRequired" character varying, "submittedUnits" character varying, "relatedNames2" character varying, "shortName" character varying, "orderObs" character varying, "cdiscCommonTests" character varying, "hl7FieldSubFieldId" character varying, "externalCopyRightNotice" character varying, "exampleUnits" character varying, "longCommonName" character varying, "unitsAndRange" character varying, "exampleUcumUnits" character varying, "exampleSiUcumUnits" character varying, "statusReason" character varying, "statusText" character varying, "changeReasonPublic" character varying, "commonTestRank" character varying, "commonOrderRank" character varying, "commonSiTestRank" character varying, "hl7AttachmentStructure" character varying, "externalCopyRightLink" character varying, "panelType" character varying, "askAtOrderEntry" character varying, "associationObservations" character varying, "versionFirstRelease" character varying, "validHl7AttachmentRequest" character varying, "displayName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9bc5289753fe440af156276ce0c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "LoincCodes"`);
    }

}
