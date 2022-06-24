import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
//user imports
import { Form } from "../entities/form.entity";
import RoleGuard from 'src/users/auth/role.guard';
import { UserForms } from '../entities/userforms.entity';
import { FormsService } from "../services/forms.service";
import { UserFormsService } from '../services/userForms.service'
import { FormMediaPayload, UserFormPayload } from "../dto/userForms.dto";
import { UsersFormsElements } from "../entities/userFormElements.entity";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import { UserFormElementService } from "../services/userFormElements.service";
import { CreateUserFormInput, GetPublicMediaInput } from "../dto/userForms.input";

@Resolver(() => UserForms)

export class UserFormResolver {

  constructor(private readonly userFormsService: UserFormsService,
    private readonly userFormElementService: UserFormElementService,
    private readonly formService: FormsService,
  ) { }

  //mutations

  @Mutation(() => UserFormPayload)
  async saveUserFormValues(@Args('createUserFormInput') createUserFormInput: CreateUserFormInput): Promise<UserFormPayload> {
    const { userForm, appointment } = await this.userFormsService.create(createUserFormInput)
    return {
      userForm: userForm,
      appointment: appointment,
      response: { status: 200, message: 'User Form Values are created successfully' }
    };
  }

  @Mutation(() => FormMediaPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  async getFormPublicMediaUrl(@Args('getPublicMediaInput') getPublicMediaInput: GetPublicMediaInput): Promise<FormMediaPayload> {
    return {
      publicUrl: await this.userFormsService.getUploadMedia(getPublicMediaInput),
      response: { status: 200, message: 'User Form Values are created successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [UsersFormsElements])
  async userFormElements(@Parent() userForm: UserForms): Promise<UsersFormsElements[]> {
    if (userForm) {
      return await this.userFormElementService.getAllUserFormElements(userForm.id);
    }
  }

  @ResolveField(() => [UsersFormsElements])
  async form(@Parent() userForm: UserForms): Promise<Form> {
    if (userForm) {
      const newForm = await this.formService.getForm(userForm?.FormId);
      const { form } = newForm || {}
      return form
    }
  }

}