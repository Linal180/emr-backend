import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { ImagingOrder } from "../entities/imagingOrder.entity";

@Injectable()
export class ImagingOrderService {
  constructor(
    @InjectRepository(ImagingOrder)
    private imagingOrderRepo: Repository<ImagingOrder>,
  ) { }


}