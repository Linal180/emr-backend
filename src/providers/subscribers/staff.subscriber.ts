import { Connection, EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { Staff } from "../entities/staff.entity";

@EventSubscriber()
export class StaffSubscriber implements EntitySubscriberInterface<Staff> {
    constructor(private readonly connection: Connection) {
        this.connection.subscribers.push(this);
    }

    listenTo() {
        return Staff;
    }

}