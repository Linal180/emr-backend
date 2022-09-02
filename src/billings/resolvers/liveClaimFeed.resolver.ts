import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { LiveClaimFeedPayload } from '../dto/live-claim-feed-payload';
import LiveClaimFeedInput from '../dto/live-claim-feed.dto';
import { LiveClaimFeed } from '../entities/liveClaimFeed.entity';
import { LiveClaimFeedService } from '../services/liveClaimFeed.service';

@Resolver(() => LiveClaimFeed)
export class LiveClaimFeedResolver {
  constructor(
    private readonly liveClaimFeedService: LiveClaimFeedService
  ) { }

  @Mutation(() => [LiveClaimFeed])
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createBilling')
  async createLiveClaimFeed(): Promise<LiveClaimFeed[]> {
    return this.liveClaimFeedService.create()
  }

  @Query(() => LiveClaimFeedPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createBilling')
  async findAllLiveClaimFeeds(@Args('liveClaimFeedInput') liveClaimFeedInput: LiveClaimFeedInput): Promise<LiveClaimFeedPayload> {
    const liveClaimFeeds= await this.liveClaimFeedService.findAllLiveClaimFeeds(liveClaimFeedInput)

    return {
      ...liveClaimFeeds,
      response: { status: 200, message: "Live Claim Feeds Fetched Successfully" }
    }
  }
}
