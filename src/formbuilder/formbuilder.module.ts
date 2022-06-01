import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaginationModule } from 'src/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';
import { Element } from './entities/element.entity';
import { FormElement } from './entities/form-elements.entity';
import { Form } from './entities/form.entity';
import { FormResolver } from './resolvers/forms.resolver';
import { FormElementsService } from './services/form-elements.service';
import { FormsService } from './services/forms.service';
import { ElementService } from './services/element.service';
import { ElementResolver } from './resolvers/element.resolver'
import { UserForms } from './entities/userforms.entity';
import { UsersFormsElements } from './entities/userFormElements.entity';
import { UserFormsService } from './services/userForms.service';
import { UserFormResolver } from './resolvers/userForms.resolver';
import { UserFormElementService } from './services/userFormElements.service';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { UserFormController } from './controllers/userFormBuilder.controller';
import { AwsModule } from 'src/aws/aws.module';
import { PatientModule } from 'src/patients/patient.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { InsuranceModule } from 'src/insurance/insurance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Element, FormElement, UserForms, UsersFormsElements]),
    forwardRef(() => UsersModule),
    PaginationModule,
    AttachmentsModule,
    AwsModule,
    PatientModule,
    AppointmentModule,
    InsuranceModule
  ],
  providers: [
    FormResolver, ElementResolver, FormsService, FormElementsService,
    ElementService, UserFormResolver, UserFormsService, UserFormElementService
  ],
  exports: [FormsService, TypeOrmModule],
  controllers: [UserFormController]
})
export class FormBuilderModule { }



