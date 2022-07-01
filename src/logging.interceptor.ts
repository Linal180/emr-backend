import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
import { catchError } from 'rxjs/operators';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
//user import
import { User } from './users/entities/user.entity';
import { PermissionData } from './users/seeds/seed-data';
import { UserLogs } from './userLogs/entities/user-logs.entity.logs'
import { getOperationType } from './lib/helper';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    let userLogsInstance = {}
    let operationType = null
    let userId = null;
    let optionalInputs = undefined;

    const execContext = GqlExecutionContext.create(context)
    const patientModuleMutations = PermissionData?.reduce<string[]>((acc, permissions) => {
      if (permissions.moduleType === 'Patient') {
        acc.push(permissions.name)
        return acc
      }
      return acc
    }, [])

    const { req, user } = execContext.getArgByIndex(2) || {}
    const { body, ip: ipAddress, headers } = req || {}
    const { referer: refererUrl } = headers || {}

    const { operationName } = body || {}
    const moduleType = execContext.getClass().name.split('Resolver')[0]
    const execContextInfo = execContext.getInfo()
    const { path: { typename } } = execContextInfo;
    operationType = getOperationType(typename as string, operationName as string)
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
      ipAddress,
      moduleType,
      refererUrl,
      operationType,
      operationName,
      ...optionalInputs
    }

    userLogsInstance = userLogRepo.create(inputs)

    return next
      .handle().pipe(
        tap(async (data) => {
          const { response } = data || {}
          const { status } = response
          userLogsInstance['responseCode'] = status || '200'
          await userLogRepo.save(userLogsInstance)
        }),
        catchError(async (err) => {
          const { status } = err || {}
          userLogsInstance['responseCode'] = status
          await userLogRepo.save(userLogsInstance)
          return throwError(() => err);
        }),
      )
  }
}