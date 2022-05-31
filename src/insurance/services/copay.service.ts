import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UtilsService } from 'src/util/utils.service';
import { CopayInput, UpdateCopayInput } from '../dto/copay-input.dto';
import { Copay } from '../entities/copay.entity';

@Injectable()
export class CopayService {
  constructor(
    @InjectRepository(Copay)
    private copayRepository: Repository<Copay>,
    private readonly utilsService: UtilsService
  ) { }

  create(createCopayInput: CopayInput): Promise<Copay> {
    const copayInstance = this.copayRepository.create(createCopayInput)
    return this.copayRepository.save(copayInstance)
  }

  findByPolicyId(id: string): Promise<Copay[]> {
    return this.copayRepository.find({ policyId: id })
  }

  findOne(id: string): Promise<Copay> {
    return this.copayRepository.findOne({ id })
  }

  async updateCopay(updateCopayInput: UpdateCopayInput): Promise<Copay> {
    try {
      return await this.utilsService.updateEntityManager(Copay, updateCopayInput.id, updateCopayInput, this.copayRepository);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
