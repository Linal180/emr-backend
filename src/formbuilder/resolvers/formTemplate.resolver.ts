import { HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//user imports
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import RoleGuard from "src/users/auth/role.guard";
import {
  FormTemplatePayload,
  FormsTemplatesPayload,
} from "../dto/formTemplate.dto";
import { CreateFormTemplateInput } from "../dto/formTemplate.input";
import { FormTemplate } from "../entities/formTemplates.entity";
import { FormTemplateService } from "../services/formTemplate.service";
//resolver
@Resolver(() => FormTemplate)
export class FormTemplateResolver {
  constructor(private readonly formTemplateService: FormTemplateService) {}

  @Mutation(() => FormTemplatePayload)
  // @UseGuards(J wtAuthGraphQLGuard, RoleGuard)
  async createFormTemplate(
    @Args("createFormTemplateInput")
    createFormTemplateInput: CreateFormTemplateInput
  ): Promise<FormTemplatePayload> {

    return {
      form: await this.formTemplateService.create(createFormTemplateInput),
      response: {
        message: "Form Template is created Successfully.",
        status: HttpStatus.OK,
      },
    };
  }

  @Query(() => FormsTemplatesPayload)
  // @UseGuards(J wtAuthGraphQLGuard, RoleGuard)
  async getAllFormsTemplates(): Promise<FormsTemplatesPayload> {

    return {
      forms: await this.formTemplateService.getAll(),
      response: {
        message: "Successful",
        status: HttpStatus.OK,
      },
    };
  }
}
