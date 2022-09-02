import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
//payloads
import { TaxonomyPayload } from '../dto/taxonomies-payload.dto';
//entities
import { Taxonomy } from '../entities/taxonomy.entity';
//services
import { TaxonomiesService } from '../services/taxonomy.service';
//inputs
import TaxonomyInput from '../dto/taxonomies-input.dto';

@Resolver(() => Taxonomy)
export class TaxonomyResolver {
  constructor(private readonly taxonomiesService: TaxonomiesService,
  ) { }

  //queries fields  

  @Query(() => TaxonomyPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllTaxonomy')
  async findAllTaxonomy(@Args('taxonomyInput') taxonomyInput: TaxonomyInput): Promise<TaxonomyPayload> {
    const taxonomies = await this.taxonomiesService.findAllTaxonomies(taxonomyInput)
    if (taxonomies) {
      return {
        ...taxonomies,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Taxonomy not found',
    });
  }
}
