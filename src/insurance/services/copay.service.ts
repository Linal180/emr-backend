import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CopayInput, UpdateCopayInput } from '../dto/copay-input.dto';
import { Copay } from '../entities/copay.entity';
import { Policy } from '../entities/policy.entity';

@Injectable()
export class CopayService {
  constructor(
    @InjectRepository(Copay)
    private copayRepository: Repository<Copay>,
    private readonly utilsService: UtilsService,
    @InjectRepository(Copay)
    private policyRepository: Repository<Policy>,
  ) { }


  /**
   * Creates copay service
   * @param createCopayInput 
   * @returns create 
   */
  async create(createCopayInput: CopayInput): Promise<Copay> {
    const { policyId, amount, type } = createCopayInput
    if (policyId) {
      const policy = await this.policyRepository.findOne({ id: policyId })
      const copayInstance = this.copayRepository.create({ ...createCopayInput, policy: policy })
      return this.copayRepository.save(copayInstance)
    }
    const copayInstance = this.copayRepository.create(createCopayInput)
    return this.copayRepository.save(copayInstance)
  }


  /**
   * Finds by policy id
   * @param id 
   * @returns by policy id 
   */
  findByPolicyId(id: string): Promise<Copay[]> {
    return this.copayRepository.find({ policyId: id })
  }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  findOne(id: string): Promise<Copay> {
    return this.copayRepository.findOne({ id })
  }


  /**
   * Updates copay
   * @param updateCopayInput 
   * @returns copay 
   */
  async updateCopay(updateCopayInput: UpdateCopayInput): Promise<Copay> {
    try {
      return await this.utilsService.updateEntityManager(Copay, updateCopayInput.id, updateCopayInput, this.copayRepository);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
