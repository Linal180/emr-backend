import { Observable } from 'rxjs';
import { getRepository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { map, tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
//user import
import { User } from './users/entities/user.entity';
import { PermissionData } from './users/seeds/seed-data';
import { UserLog } from './users/entities/user-logs.logs.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const execContext = GqlExecutionContext.create(context)
    let savedLogs
    const patientModuleMutations = PermissionData?.reduce<string[]>((acc, permissions) => {
      if (permissions.moduleType === 'Patient') {
        acc.push(permissions.name)
        return acc
      }
      return acc
    }, [])
    const { req, user } = execContext.getArgByIndex(2) || {}
    const { body } = req || {}
    const { operationName } = body || {}
    const moduleType = execContext.getClass().name.split('Resolver')[0]
    console.log("patientModuleMutations", patientModuleMutations, execContext.getClass().name, moduleType, operationName, body)
    console.log("execContext", execContext, Reflect.getMetadata('type', execContext.getHandler()))
    console.log('user => ', user)
    // if (user) {
    //   const { sub: userId, roles } = user || {}
    //   const userInfo = await getRepository(User).findOne(userId)
    //   const { facility } = userInfo || {}
    //   const { id: facilityId, practiceId } = facility || {}
    //   const isSuperAdmin = roles?.some(role => role?.role === 'super-admin')
    //   const isPracticeAdmin = roles?.some(role => role?.role === 'practice-admin')
    //   const optionalInputs = isSuperAdmin ? undefined :
    //     isPracticeAdmin ? { practiceId: userInfo.facility.practiceId } :
    //       { practiceId: practiceId, facilityId }

    //   const userLogsInstance = await getRepository(UserLog).create({
    //     operationName: operationName,
    //     userId: userInfo.id,
    //     reqInfo: body,
    //     ipAddress: '',
    //     ...(optionalInputs && optionalInputs)
    //   })

    //   savedLogs = await getRepository(UserLog).save(userLogsInstance)
    // }
    return next
      .handle().pipe(
        tap(async (data) => {
          // savedLogs.resInfo = data
          // await getRepository(UserLog).save(savedLogs)
          console.log('data', data)
        })
      )
  }
}