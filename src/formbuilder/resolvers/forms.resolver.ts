import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreateFormInput } from '../dto/create-form.input';
import FormInput from '../dto/form-input.dto';
import { FormPayload } from '../dto/form-payload.dto';
import { FormsPayload } from '../dto/forms-payload.dto';
import { GetForm, RemoveForm, UpdateFormInput } from '../dto/update-form.input';
import { UserFormsPayload } from '../dto/userForms.dto';
import { UserFormInput } from '../dto/userForms.input';
import { FormElement } from '../entities/form-elements.entity';
import { Form } from '../entities/form.entity';
import { FormElementsService } from '../services/form-elements.service';
import { FormsService } from '../services/forms.service';
import { UserFormsService } from '../services/userForms.service';

@Resolver(() => Form)
export class FormResolver {
  constructor(private readonly formsService: FormsService,
    private readonly formElementsService: FormElementsService,
    private readonly userFormsService: UserFormsService,
  ) { }

  @Mutation(() => FormPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createForm(@Args('createFormInput') createFormInput: CreateFormInput) {
    return {
      form: await this.formsService.createForm(createFormInput),
      response: { status: 200, message: 'Service created successfully' }
    };
  }

  @Mutation(() => FormPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateForm(@Args('updateFormInput') updateFormInput: UpdateFormInput) {
    return {
      form: await this.formsService.updateForm(updateFormInput),
      response: { status: 200, message: 'Form updated successfully' }
    };
  }

  @Query(returns => FormsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async findAllForms(@Args('formInput') formInput: FormInput): Promise<FormsPayload> {
    const forms = await this.formsService.findAllForms(formInput)
    if (forms) {
      return {
        ...forms,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Forms not found',
    });
  }

  @Query(returns => FormPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async getForm(@Args('getForm') getForm: GetForm): Promise<FormPayload> {
    const form = await this.formsService.getForm(getForm.id)
    return {
      ...form,
      response: { status: 200, message: 'Form fetched successfully' }
    };
  }

  @Query(returns => FormPayload)
  async getPublicForm(@Args('getForm') getForm: GetForm): Promise<FormPayload> {
    const form = await this.formsService.getForm(getForm.id)
    return {
      ...form,
      response: { status: 200, message: 'Form fetched successfully' }
    };
  }

  @Mutation(() => FormPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async removeForm(@Args('removeForm') removeForm: RemoveForm) {
    await this.formsService.removeForm(removeForm);
    return { response: { status: 200, message: 'Form Deleted successfully.' } };
  }

  @Query(() => UserFormsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])

  async findAllUsersForms(@Args('userFormInput') userFormInput: UserFormInput): Promise<UserFormsPayload> {
    const form = await this.formsService.findOne(userFormInput.FormId);
    const userForms = await this.userFormsService.getAll(userFormInput);
    form.userForms = userForms.userForms
    if (userForms) {
      return {
        form,
        pagination: userForms.pagination,
        response: { status: 200, message: "Ok" }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User Forms not found',
    });

  }

  @ResolveField(() => [FormElement])
  async formElements(@Parent() form: Form) {
    if (form) {
      const formElements = await this.formElementsService.getAllFormElements(form.id);
      return formElements
    }
  }

}
