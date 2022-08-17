import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { Form } from "../entities/form.entity";
import { UserForms } from '../entities/userforms.entity';
import { UsersFormsElements } from "../entities/userFormElements.entity";
//service
import { FormsService } from "../services/forms.service";
import { UserFormsService } from '../services/userForms.service'
import { UserFormElementService } from "../services/userFormElements.service";
//inputs
import { CreateUserFormInput, GetPublicMediaInput } from "../dto/userForms.input";
//payload
import { FormMediaPayload, UserFormPayload } from "../dto/userForms.dto";

@Resolver(() => UserForms)

export class UserFormResolver {

  constructor(private readonly userFormsService: UserFormsService,
    private readonly userFormElementService: UserFormElementService,
    private readonly formService: FormsService,
  ) { }

  //mutations

  @Mutation(() => UserFormPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('name', 'saveUserFormValues')
  async saveUserFormValues(@Args('createUserFormInput') createUserFormInput: CreateUserFormInput): Promise<UserFormPayload> {
    const { userForm, appointment } = await this.userFormsService.create(createUserFormInput)
    return {
      userForm: userForm,
      appointment: appointment,
      response: { status: 200, message: 'User Form Values are created successfully' }
    };
  }

  @Mutation(() => FormMediaPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
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