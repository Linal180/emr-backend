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

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Element, FormElement]),
    forwardRef(() => UsersModule),
    PaginationModule
  ],
  providers: [FormResolver, ElementResolver, FormsService, FormElementsService, ElementService],
  exports: [FormsService, TypeOrmModule],
})
export class FormBuilderModule { }



