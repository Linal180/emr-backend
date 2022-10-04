
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { Sections } from "../entities/sections.entity";
import { Questions } from "../entities/questions.entity";
//inputs
import { FindAllSectionsInput } from "../inputs/sections.input";
//payloads
import { FindAllSectionsPayload } from "../payloads/sections.payload";
//services
import { SectionService } from "../services/sections.service";
import { QuestionService } from "../services/questions.service";


@Resolver(() => Sections)
export class SectionsResolver {
	constructor(
		private readonly sectionService: SectionService,
		private readonly questionService: QuestionService,
		) { }

	//queries

	@Query(() => FindAllSectionsPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'findAllSections')
	async findAllSections(@Args('findAllSectionsInput') findAllSectionsInput: FindAllSectionsInput): Promise<FindAllSectionsPayload> {
		const { sections, pagination } = await this.sectionService.fetchAll(findAllSectionsInput)
		if (sections) {
			return {
				sections,
				pagination,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

	//resolve fields

  @ResolveField(() => [Questions])
  async questions(@Parent() sections: Sections): Promise<Questions[]> {
    if (sections?.id) {
      return await this.questionService.findBySectionId(sections?.id);
    }
  }

}