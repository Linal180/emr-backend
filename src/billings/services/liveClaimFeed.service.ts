import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as FormData from 'form-data';
//entities
import { LiveClaimFeed } from '../entities/liveClaimFeed.entity';
import LiveClaimFeedInput from '../dto/live-claim-feed.dto';
import { LiveClaimFeedPayload } from '../dto/live-claim-feed-payload';
import { PaginationService } from 'src/pagination/pagination.service';
//services
//payloads
//helpers

@Injectable()
export class LiveClaimFeedService {
  constructor(
    @InjectRepository(LiveClaimFeed)
    private liveClaimFeedRepository: Repository<LiveClaimFeed>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly httpService: HttpService
  ) { }

  /**
   * Creates live claim feed service
   * @returns create 
   */
  async create(): Promise<LiveClaimFeed[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const liveClaimFeeds = await this.liveClaimFeedRepository.find()

      const formData = new FormData()
      formData.append('AccountKey', process.env.CLAIM_MD_ID)
      formData.append('NewOnly', '0')
      const allEraResponse = await this.httpService.post('https://www.claim.md/services/era/', formData, {
        headers: {
          'Accept': 'text/json'
        }
      })?.toPromise()
      console.log("allEraResponse", allEraResponse.data.era)

      const individualEras = await Promise.all(allEraResponse.data.era.map(async (eraData) => {
        const formDataChild = new FormData()
        formDataChild.append('AccountKey', process.env.CLAIM_MD_ID)
        formDataChild.append('eraid', eraData.eraid)

        const individualEra = await this.httpService.post('https://www.claim.md/services/eraxml/', formDataChild, {
          headers: {
            'Accept': 'text/json'
          }
        })?.toPromise()
        const { data } = individualEra || {}
        return {
          paidDate: data.paid_date,
          provAddress1: data.prov_addr_1,
          provState: data.prov_state,
          provCompanyId: data.payer_companyid,
          provCity: data.prov_city,
          payerAddress1: data.payer_addr_1,
          provRouting: data.prov_routing,
          payerRouting: data.payer_routing,
          payerCity: data.payer_city,
          eraId: data.eraid,
          paymentFormat: data.payment_format,
          payerName: data.payer_name,
          provTaxId: data.prov_taxid,
          fromDos: data.claim[0]?.from_dos,
          patientFullName: `${data.claim[0]?.pat_name_f} ${data.claim[0]?.pat_name_l}`,
          InsuranceFullName: `${data.claim[0]?.ins_name_f} ${data.claim[0]?.ins_name_l}`,
          totalPaid: data.claim[0]?.total_paid,
          thruDos: data.claim[0]?.thru_dos,
          crossOverCarrier: data.claim[0]?.crossover_carrier,
          crossOverId: data.claim[0]?.crossover_id,
          pcn: data.claim[0]?.pcn,
          provNpi: data.prov_npi,
          totalCharge: data.claim[0]?.total_charge,
          charge: JSON.stringify(data.claim[0]?.charge),
          paidAmount: data.paid_amount,
          provAccount: data.prov_account,
          payerAccount: data.payer_account,
          provZip: data.prov_zip,
          paymentMethod: data.payment_method,
          provName: data.prov_name,
          payerId: data.payerid,
          checkNumber: data.check_number
        }
      }))
      const createdLiveClaimFeeds = await Promise.all(individualEras.map(async (individualEra: LiveClaimFeed) => {
        const itemExist = await this.liveClaimFeedRepository.findOne({ eraId: individualEra.eraId })
        let liveClaimFeed: LiveClaimFeed
        if (!itemExist) {
          const liveClaimFeedInstance = this.liveClaimFeedRepository.create({ ...individualEra })
          liveClaimFeed = await this.liveClaimFeedRepository.save(liveClaimFeedInstance)
        }
        return liveClaimFeed || itemExist
      }))
      console.log('individualEras', individualEras)
      await queryRunner.commitTransaction();
      return createdLiveClaimFeeds
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Finds all live claim feeds
   * @param liveClaimFeedInput 
   * @returns all live claim feeds 
   */
  async findAllLiveClaimFeeds(liveClaimFeedInput: LiveClaimFeedInput): Promise<LiveClaimFeedPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<LiveClaimFeed>(this.liveClaimFeedRepository, { ...liveClaimFeedInput })
      return {
        pagination: {
          ...paginationResponse
        },
        liveClaimFeeds: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
