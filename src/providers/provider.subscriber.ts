import { Connection, EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { AttachmentsService } from "src/attachments/attachments.service";
import { Doctor } from "./entities/doctor.entity";

@EventSubscriber()
export class DoctorSubscriber implements EntitySubscriberInterface<Doctor> {
  constructor(private readonly connection: Connection, private readonly attachmentsService: AttachmentsService) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Doctor;
  }
 
}