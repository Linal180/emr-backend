import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { Connection, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { AttachmentsService } from "../attachments/services/attachments.service";
import { ObservationsAttachmentsPayload } from './dto/update-lab-test-observationItem.input';
import { Observations } from './entities/observations.entity';

@EventSubscriber()
export class ObservationsSubscriber implements EntitySubscriberInterface<Observations> {
  constructor(private readonly connection: Connection, private readonly attachmentsService: AttachmentsService) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Observations;
  }
  // async afterLoad(entity: ObservationsAttachmentsPayload): Promise<ObservationsAttachmentsPayload> {
  //   const attachments = await this.attachmentsService.findAttachments(entity.id, AttachmentType.lab)
  //   entity.attachments = attachments
  //   return entity;
  // }
}