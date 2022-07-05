import { tap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
//user import
import { getOperationType } from './lib/helper';
import { User } from './users/entities/user.entity';
import { Patient } from './patients/entities/patient.entity';
import { PATIENT_LOGGING_PERMISSIONS } from 'src/lib/constants';
import { UserLogs } from './userLogs/entities/user-logs.entity.logs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  async getPatient(variables: any): Promise<null | string> {
    const inputs = Object.keys(variables)
    const operation = inputs[0]
    const values = variables[operation]
    const { id, patientId } = values || {}
    const patientRepo = getRepository(Patient)

    if (id) {
      const patientInstance = await patientRepo.findOne(id);
      const { id: patientId } = patientInstance || {}
      return patientId ? patientId : null;
    }

    if (patientId) {
      const patientInstance = await patientRepo.findOne(patientId);
      const { id } = patientInstance || {}
      return id ? id : null;
    }

    return null
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    let userLogsInstance = {}
    let operationType = null
    let userId = null;
    let activityPayload = null;
    let optionalInputs = undefined;
    let patientId = null;

    const execContext = GqlExecutionContext.create(context);
    const { req, user } = execContext.getArgByIndex(2) || {}
    const { body, ip: ipAddress, headers } = req || {}
    const { origin, pathname } = headers || {}
    const ControllerRequest = context.getArgs() || {}
    const { headers: controllerHeaders, ip } = ControllerRequest[0] || {}
    const { origin: originRequest, pathname: pathnameReq } = controllerHeaders || {}

    const refererUrl = `${origin || originRequest}${pathname || pathnameReq}`

    const { operationName, variables } = body || {}
    const moduleType = execContext.getClass().name.split('Resolver')[0]
    const execContextInfo = execContext.getInfo()
    const { path } = execContextInfo || {};
    const { typename } = path || {}
    if (operationName) {
      const operation = operationName?.toUpperCase()
      const isFound = PATIENT_LOGGING_PERMISSIONS?.includes(operation)
      if (operation && isFound) {
        patientId = await this.getPatient(variables)
      }
    }
    if (typename) operationType = getOperationType(typename as string, operationName as string)
    //entities
    const userLogRepo = getRepository(UserLogs, process.env.DATABASE_LOG_ID || 'logs')
    const userRepo = await getRepository(User)

    if (user) {
      const { sub: id, roles } = user || {}

      const isSuperAdmin = roles?.some(role => role?.role === 'super-admin')
      const isPracticeAdmin = roles?.some(role => role?.role === 'practice-admin')

      const userInfo = await userRepo.findOne(id)
      const { facility } = userInfo || {}
      const { id: facilityId, practiceId } = facility || {}

      userId = id
      optionalInputs = isSuperAdmin ? undefined :
        isPracticeAdmin ? { practiceId: userInfo.facility.practiceId } :
          { practiceId, facilityId }
    }

    const inputs = {
      userId,
      ipAddress: ipAddress || ip,
      moduleType,
      refererUrl,
      operationType,
      operationName,
      patientId,
      ...optionalInputs
    }

    userLogsInstance = userLogRepo.create(inputs)

    return next
      .handle().pipe(
        tap(async (data) => {
          const { response } = data || {}
          const { status } = response || {}
          userLogsInstance['responseCode'] = status || '200'
          moduleType !== 'UserLogs' && await userLogRepo.save(userLogsInstance)
        }),
        catchError(async (err) => {
          const { status } = err || {}
          userLogsInstance['responseCode'] = status
          moduleType !== 'UserLogs' && await userLogRepo.save(userLogsInstance)
          return throwError(() => err);
        }),
      )
  }
}