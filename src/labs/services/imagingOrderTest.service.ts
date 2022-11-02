import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { ImagingOrderTest } from "../entities/imagingOrderTest.entity";


@Injectable()
export class ImagingOrderTestService {
  constructor(
    @InjectRepository(ImagingOrderTest)
    private imagingOrderTestRepo: Repository<ImagingOrderTest>
  ) { }



}