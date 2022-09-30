import * as moment from "moment";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import {
  Between, Equal, FindConditions, FindManyOptions, FindOperator, In, JoinOptions, Not, ObjectLiteral,
  Raw, Repository, WhereExpressionBuilder, MoreThanOrEqual, LessThanOrEqual
} from "typeorm";
import { Speciality } from "src/providers/entities/doctor.entity";
import { PaginatedEntityInput } from "./dto/pagination-entity-input.dto";
import PaginationPayloadInterface from "./dto/pagination-payload-interface.dto";

interface whereConditionInput {
  status?: string | number
  phychType?: string
  ageGroupId?: string
  categoryId?: string
  createdAt?: FindOperator<string>
  dueDate?: FindOperator<string>
  user?: {
    id: string

  },
  ageGroups?: {
    id: string
  },
  category?: {
    id: string
  },
}
interface WhereOptions<Entity = any> {
  where: whereConditionInput & (FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string),
  withDeleted?: boolean
}

interface FilterOptionsResponse {
  where?: ObjectLiteral,
  join?: JoinOptions
}

interface OrderByColumn {
  columnName: string
  order: 'ASC' | 'DESC'
}

@Injectable()
export class PaginationService {

  /**
   * Will paginate
   * @template T 
   * @param repository 
   * @param paginationInput 
   * @returns paginated response PaginationPayloadInterface<T>
   */
  async willPaginate<T>(repository: Repository<T>, paginationInput: PaginatedEntityInput, select?: string[], orderByColumn?: OrderByColumn): Promise<PaginationPayloadInterface<T>> {
    try {
      const { associatedTo, associatedToField } = paginationInput;
      const { skip, take, order, where } = this.orchestrateOptions(paginationInput);
      let filterOption: FilterOptionsResponse = null;

      if (associatedTo && associatedToField.columnValue) {
        filterOption = this.getFilterOptions(paginationInput);
      }

      const { paginationOptions: { page, limit } } = paginationInput || {};
      let query: FindManyOptions = null;

      if (filterOption) {
        query = {
          where: (qb: WhereExpressionBuilder) => {
            qb.where(
              filterOption.where.str,
              filterOption.where.obj
            ).andWhere(where as ObjectLiteral)
          },
          skip,
          take,
          order: orderByColumn ? {
            [orderByColumn.columnName]: orderByColumn.order
          } : order,
          select
        };
        query.join = filterOption.join;
      } else {
        query = {
          where: (qb: WhereExpressionBuilder) => {
            qb.where(where as ObjectLiteral)
          },
          skip,
          take,
          order: orderByColumn ? {
            [orderByColumn.columnName]: orderByColumn.order
          } : order,
          select
        }
      }

      const [paginatedData, totalCount] = await repository.findAndCount(query);
      const totalPages = Math.ceil(totalCount / limit)

      if (page > totalPages)
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Page Not Found',
        });

      return {
        totalCount,
        page,
        limit,
        totalPages,
        data: paginatedData,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Filter options
   * @param paginationInput 
   * @returns options 
   */
  private getFilterOptions(paginationInput: PaginatedEntityInput): FilterOptionsResponse {
    const { associatedToField: { columnValue, columnName, columnName2, columnName3, filterType }, associatedTo, relationField } = paginationInput;

    const join: JoinOptions = { alias: 'thisTable', innerJoinAndSelect: { [associatedTo]: `thisTable.${relationField}` } };
    let where = { str: {}, obj: {} }
    if (filterType === 'enumFilter') {
      where = {
        str: `${associatedTo}.${columnName} IN (:...data)`,
        obj: { data: [columnValue] }
      };
    } else if (filterType === 'stringFilter') {
      where = {
        str: `(${associatedTo}.${columnName} ILIKE :data${columnName2 ? ` OR ${associatedTo}.${columnName2} ILIKE :data` : ''}${columnName3 ? ` OR ${associatedTo}.${columnName3} ILIKE :data` : ''})`,
        obj: { data: `%${columnValue}%` }
      };
    }
    if (relationField) {
      return { join, where };
    } else {
      return { where };
    }
  }


  /**
   * Orchestrates options
   * @param paginationInput 
   * @returns options 
   */
  private orchestrateOptions(paginationInput: PaginatedEntityInput): FindManyOptions {
    const {
      status,
      primaryContact,
      userId,
      to,
      MembershipPlan,
      isPrivate,
      isActive,
      currentPhaseId,
      from,
      appointmentId,
      patientId,
      appointmentNumber,
      dueToday,
      facilityId,
      singleFacilityId,
      FormId,
      facilityName,
      allergyName,
      allergyType,
      reactionName,
      practiceName,
      serviceName,
      searchString,
      role,
      patientRecord,
      doctorId,
      practiceId,
      appointmentStatus,
      categoryId,
      labTestStatus,
      category,
      isSystemForm,
      doctorFirstName,
      roleName,
      customRole,
      typeId,
      AttachmentModuleType,
      formType,
      loincNum,
      component,
      specimenTypeName,
      orderNumber,
      documentPracticeId,
      agreementFacilityId,
      agreementPracticeId,
      documentTypeName,
      providerId,
      speciality,
      moduleType,
      logUserId,
      logStartDate,
      logEndDate,
      code,
      feeScheduleName,
      effectiveDate,
      expiryDate,
      feeScheduleId,
      claimFeedFacilityName,
      claimFeedPatientName,
      claimFeedPayerId,
      claimFeedFromDate,
      claimFeedToDate,
      claimStatusId,
      claimNo,
      billingFromDate,
      billingToDate,
      selfId,
      isClaimStatus,
      cvxId,
      mvxId,
      specialSectionId,
      paginationOptions: { page, limit: take } } = paginationInput || {}
    const skip = (page - 1) * take;

    const today = new Date()

    const whereOptions: WhereOptions = {
      where: {
        ...(patientId && patientId != null && {
          patientId
        }),
        ...(appointmentId && {
          appointmentId
        }),
        ...(categoryId && {
          categoryId
        }),
        ...(category && {
          category
        }),
        ...(facilityId && {
          facilityId
        }),
        ...(allergyName && {
          name: Raw(alias => `${alias} ILIKE '%${allergyName}%'`),
        }),
        ...(allergyType && {
          allergyType: In([allergyType]),
        }),
        ...(singleFacilityId && {
          id: singleFacilityId
        }),
        ...(typeId && {
          typeId
        }),
        ...(AttachmentModuleType && {
          type: AttachmentModuleType
        }),
        ...(doctorId && {
          doctorId
        }),
        ...(providerId && {
          providerId
        }),
        ...(FormId && {
          FormId
        }),
        ...(patientRecord && {
          patientRecord: Raw(alias => `${alias} ILIKE '%${patientRecord}%'`),
        }),
        ...(orderNumber && {
          orderNumber: Raw(alias => `${alias} ILIKE '%${orderNumber}%'`),
        }),
        ...(reactionName && {
          name: Raw(alias => `${alias} ILIKE '%${reactionName}%'`),
        }),
        ...(loincNum && {
          loincNum: Raw(alias => `${alias} ILIKE '%${loincNum}%'`),
        }),
        ...(component && {
          component: Raw(alias => `${alias} ILIKE '%${component}%'`),
        }),
        ...(role && {
          role: Not(role)
        }),
        ...(roleName && {
          role: Raw(alias => `${alias} ILIKE '%${roleName}%'`),
        }),
        ...(specimenTypeName && {
          name: Raw(alias => `${alias} ILIKE '%${specimenTypeName}%'`),
        }),
        ...(facilityName && {
          name: Raw(alias => `${alias} ILIKE '%${facilityName}%'`),
        }),
        ...(practiceName && {
          name: Raw(alias => `${alias} ILIKE '%${practiceName}%'`),
        }),
        ...(serviceName && {
          name: Raw(alias => `${alias} ILIKE '%${serviceName}%'`),
        }),
        ...(doctorFirstName && {
          firstName: Raw(alias => `${alias} ILIKE '%${doctorFirstName}%'`),
        }),
        ...(documentTypeName && {
          type: Raw(alias => `${alias} ILIKE '%${documentTypeName}%'`),
        }),
        ...(speciality && {
          speciality: speciality as Speciality,
        }),
        ...(practiceId && practiceId !== null && {
          practiceId: practiceId
        }),
        ...(appointmentStatus && {
          status: appointmentStatus
        }),
        ...(status != null && {
          status
        }),
        ...(primaryContact != null && {
          primaryContact
        }),
        ...(isActive != null && {
          isActive
        }),
        ...(customRole != null && {
          customRole
        }),
        ...(isPrivate && {
          isPrivate: Not(isPrivate)
        }),
        ...(MembershipPlan && {
          membershipId: MembershipPlan
        }),
        ...(currentPhaseId && {
          phaseId: currentPhaseId
        }),
        ...(appointmentNumber && {
          appointmentNumber: appointmentNumber
        }),
        ...(dueToday && {
          dueDate: Equal(new Date().toISOString().split('T')[0])
        }),
        ...(isSystemForm != null && {
          isSystemForm
        }),
        ...(formType && {
          type: formType
        }),
        ...(labTestStatus && {
          labTestStatus: Raw(alias => `${alias} != '${labTestStatus}'`),
        }),
        ...(documentPracticeId && {
          practiceId: Raw(alias => `${alias} Is null OR ${alias} = '${documentPracticeId}'`),
        }),
        ...(agreementPracticeId && {
          practiceId: Raw(alias => `${alias} Is null OR ${alias} = '${agreementPracticeId}'`),
        }),
        ...(agreementFacilityId && {
          facilityId: Raw(alias => `${alias} Is null OR ${alias} = '${agreementFacilityId}'`),
        }),
        ...(cvxId && { cvxId }),
        ...(specialSectionId && { specialId: specialSectionId }),
        ...(mvxId && { mvxId }),
        ...(claimNo && claimNo != null && { claimNo }),
        ...(isClaimStatus && { claimStatusId: claimStatusId ? claimStatusId : Raw(alias => `${alias} is not null`) }),
        ...(billingFromDate && billingFromDate != null && { from: billingFromDate }),
        ...(billingToDate && billingToDate != null && { to: billingToDate }),
        ...(code && code != null && { code }),
        ...(feeScheduleId && { feeScheduleId }),
        ...(moduleType && moduleType != null && { moduleType }),
        ...(logUserId && logUserId != null && { userId: logUserId }),
        ...(feeScheduleName && feeScheduleName != null && { name: feeScheduleName }),
        ...(logEndDate && logEndDate != null && { createdAt: LessThanOrEqual(new Date(logEndDate)) }),
        ...(logStartDate && logStartDate != null && { createdAt: MoreThanOrEqual(new Date(logStartDate)) }),
        ...(expiryDate && expiryDate != null && { expiryDate: Raw(alias => `${alias} Is null OR ${alias} <= '${today}'`) }),
        ...(effectiveDate && effectiveDate != null && { effectiveDate: Raw(alias => `${alias} Is null OR ${alias} >= '${today}'`) }),
        ...(claimFeedFacilityName && { provName: Raw(alias => `${alias} ILIKE '%${claimFeedFacilityName}%'`) }),
        ...(claimFeedPatientName && { patientFullName: Raw(alias => `${alias} ILIKE '%${claimFeedPatientName}%'`) }),
        ...(claimFeedPayerId && { payerId: Raw(alias => `${alias} ILIKE '%${claimFeedPayerId}%'`) }),
        ...(claimFeedFromDate && { fromDos: Raw(alias => `${alias} = '${moment(claimFeedFromDate).format("YYYYMMDD")}'`) }),
        ...(claimFeedToDate && { thruDos: Raw(alias => `${alias} = '${moment(claimFeedToDate).format("YYYYMMDD")}'`) }),
      }
    };

    // Assigned to User
    if (userId) {
      !Number.isInteger(status) && !status && delete whereOptions.where.status
      whereOptions.where.user = { id: userId }
    }

    if (selfId) {
      !Number.isInteger(status) && !status && delete whereOptions.where.status
      whereOptions.where.user = { id: selfId }
    }

    // FROM - TO Filter
    if (from) {
      const toDate: Date = to ? new Date(to) : new Date()
      whereOptions.where.createdAt = Between(new Date(from).toISOString(), toDate.toISOString())
    }
    // Where clause options
    return {
      ...whereOptions,
      order: {
        createdAt: "DESC"
      },
      skip,
      take,
    };
  }
}
