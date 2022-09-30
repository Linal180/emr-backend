
import { Resolver } from "@nestjs/graphql";
//entities
import { DependentQuestions } from "../entities/dependentQuestions.entity";
//services
import { DependentQuestionService } from "../services/dependentQuestions.service";

@Resolver(() => DependentQuestions)
export class DependentQuestionsResolver {
	constructor(private readonly dependentQuestionService: DependentQuestionService) { }

}