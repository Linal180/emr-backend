import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/mailer/mailer.service";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly connection: Connection,
    private readonly mailerSerivce: MailerService,
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const emailGotUpdated = event.updatedColumns.find(value => value.propertyName, User.prototype.email);
    const passwordGotUpdated = event.updatedColumns.find(value => value.propertyName, User.prototype.password);
    if (emailGotUpdated) {
      if (event.databaseEntity.email !== event.entity.email) {
        const user = event.entity
        const isInvestor = user && user.roles.some(role => role.role.includes('investor' || 'owner'))
        Logger.log(`Email changed from 
        ${event.databaseEntity.email} to 
				${event.entity.email}`, 'Email Got Updated');
        event.entity.emailVerified = false;
        this.mailerSerivce.sendVerificationEmail(user.email, user.fullName, user.id, isInvestor, user.token)
      }
    }
    if (passwordGotUpdated && event.entity.password) {
      const hashedPassword = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
      if (event.databaseEntity.password !== event.entity.password) {
        Logger.log(`Password changed from ${event.databaseEntity.password} to ${hashedPassword}`, 'Password Got Updated');
        event.entity.password = hashedPassword;
      }
    }
  }
}