import { PatientAttachmentsPayload } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { Connection, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { AttachmentsService } from "../attachments/attachments.service";
import { Patient } from './entities/patient.entity';

@EventSubscriber()
export class PatientSubscriber implements EntitySubscriberInterface<Patient> {
  constructor(private readonly connection: Connection, private readonly attachmentsService: AttachmentsService) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Patient;
  }

  async afterLoad(entity: PatientAttachmentsPayload): Promise<PatientAttachmentsPayload> {
    const attachments = await this.attachmentsService.findAttachments(entity.id, AttachmentType.PATIENT)
    entity.attachments = attachments
    return entity;
  }
}