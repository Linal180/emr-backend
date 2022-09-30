
import { Resolver } from "@nestjs/graphql";
// entities
import { SocialHistory } from "../entities/socialHistory.entity";
// services
import { SocialHistoryService } from "../services/socialHistory.service";


@Resolver(() => SocialHistory)
export class SocialHistoryResolver {
	constructor(private readonly socialHistoryService: SocialHistoryService) { }


}