import { isUri } from 'valid-url';
import { generate, isValid } from 'shortid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
//inputs
import { CreateShortUrlInput } from './dto/shortUrl.input';
//entities
import { ShortUrl } from './shortUrl.entity';

@Injectable()
export class ShortUrlService {
  constructor(@InjectRepository(ShortUrl)
  private shortUrlRepo: Repository<ShortUrl>,) { }

  async create(params: CreateShortUrlInput): Promise<ShortUrl> {
    try {
      const { longLink } = params || {}
      const isValidUrl = isUri(longLink)
      if (!isValidUrl) {
        throw new Error('Invalid URL')
      }
      const baseUrl = process.env.API_BASE_URL || '';
      const urlCode = generate()
      const shortUrl = this.shortUrlRepo.create({ urlCode, longLink, shortLink: `${baseUrl}/shortUrl/${urlCode}` });
      return await this.shortUrlRepo.save(shortUrl)
    } catch (error) {
      throw new InternalServerErrorException(error)

    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<ShortUrl> {
    try {
      return await this.shortUrlRepo.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Finds one by url code
   * @param urlCode 
   * @returns one by url code 
   */
  async findOneByUrlCode(urlCode: string): Promise<ShortUrl> {
    try {
      const valid = isValid(urlCode);
      if (!valid) {
        throw new Error("Invalid Url Code");
      }
      return await this.shortUrlRepo.findOne({ urlCode })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
