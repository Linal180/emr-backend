import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//inputs
import { CreateShortUrlInput, GetShortUrlInput } from './dto/shortUrl.input';
//services
import { ShortUrlService } from './shortUrl.service';
//payload
import { ShortUrlResponse } from './dto/shortUrl.payload';
//entities
import { ShortUrl } from './shortUrl.entity';

@Resolver(() => ShortUrl)
export class ShortUrlResolver {
  constructor(private readonly shortUrlService: ShortUrlService) { }

  //mutations

  @Mutation(() => ShortUrlResponse)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createShortUrl')
  async createShortUrl(@Args('createShortUrlInput') createShortUrlInput: CreateShortUrlInput): Promise<ShortUrlResponse> {
    return {
      shortUrl: await this.shortUrlService.create(createShortUrlInput),
      response: { status: 200, message: 'Short Url is created successfully.' }
    };
  }

  //queries

  @Query(() => ShortUrlResponse)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createShortUrl')
  async getShortUrl(@Args('getShortUrlInput') getShortUrlInput: GetShortUrlInput): Promise<ShortUrlResponse> {
    return {
      shortUrl: await this.shortUrlService.findOneByUrlCode(getShortUrlInput?.urlCode),
      response: { status: 200, message: 'Short Url fetch successfully.' }
    };
  }

}
