import { Connection, EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { Doctor } from "../entities/doctor.entity";

@EventSubscriber()
export class DoctorSubscriber implements EntitySubscriberInterface<Doctor> {
  constructor(private readonly connection: Connection) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Doctor;
  }

}