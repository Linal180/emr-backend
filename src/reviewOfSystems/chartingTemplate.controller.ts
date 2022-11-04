import { Body, Controller, Post } from '@nestjs/common';
import { CreateTemplateType } from 'src/lib/constants';
import { ChartingTemplateService } from './services/chartingTemplate.service';

@Controller('chartingTemplate')
export class ChartingTemplateController {
  constructor(private readonly chartingTemplateService: ChartingTemplateService) { }


  @Post()
  async create(@Body() templateData: CreateTemplateType) {
    const template = this.chartingTemplateService.create(templateData)
    return template
  }

}