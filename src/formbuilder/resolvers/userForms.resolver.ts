import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//user imports
import RoleGuard from 'src/users/auth/role.guard';
import { CreateUserFormInput, UserFormInput } from "../dto/userForms.input";
import { UserFormPayload, UserFormsPayload } from "../dto/userForms.dto";
import { UserForms } from '../entities/userforms.entity';
import { UserFormsService } from '../services/userForms.service'
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import { UsersFormsElements } from "../entities/userFormElements.entity";
import { UserFormElementService } from "../services/userFormElements.service";
import { FormsService } from "../services/forms.service";
import { Form } from "../entities/form.entity";

@Resolver(() => UserForms)

export class UserFormResolver {

  constructor(private readonly userFormsService: UserFormsService,
    private readonly userFormElementService: UserFormElementService,
    private readonly formService: FormsService,
  ) { }

  @Query(() => UserFormsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])

  async findAllUsersForms(@Args('userFormInput') userFormInput: UserFormInput): Promise<UserFormsPayload> {
    const userForms = await this.userFormsService.getAll(userFormInput);
    if (userForms) {
      return {
        ...userForms,
        response: { status: 200, message: "Ok" }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User Forms not found',
    });

  }

  @Mutation(() => UserFormPayload)
  async saveUserFormValues(@Args('createUserFormInput') createUserFormInput: CreateUserFormInput): Promise<UserFormPayload> {
    return {
      userForm: await this.userFormsService.create(createUserFormInput),
      response: { status: 200, message: 'User Form Values are created successfully' }
    };
  }

  @ResolveField(() => [UsersFormsElements])
  async userFormElements(@Parent() userForm: UserForms): Promise<UsersFormsElements[]> {
    if (userForm) {
      return await this.userFormElementService.getAllUserFormElements(userForm.FormId);
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