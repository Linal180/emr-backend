import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//services
import { ShortUrlService } from './shortUrl.service';
//resolver
import { ShortUrlResolver } from './shortUrl.resolver';
//entities
import { ShortUrl } from './shortUrl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl])],
  providers: [
    ShortUrlService,
    ShortUrlResolver
  ],
  exports: [TypeOrmModule],
})
export class ShortUrlModule { }
