import { Controller, Get, Param, Res } from "@nestjs/common";
import { ShortUrlResponse } from "./dto/shortUrl.payload";
import { ShortUrl } from "./shortUrl.entity";
import { ShortUrlService } from "./shortUrl.service";

@Controller('shortUrl')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) { }


  @Get('/:urlCode')
  async getShortUrl(@Param('urlCode') urlCode: string, @Res() res) {
    const shortUrl = await this.shortUrlService.findOneByUrlCode(urlCode);
    const { longLink } = shortUrl || {}
    res.redirect(longLink)
  }

}