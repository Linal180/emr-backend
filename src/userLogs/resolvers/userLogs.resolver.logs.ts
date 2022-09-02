import { Args, Query, Resolver } from "@nestjs/graphql";
import { HttpStatus, NotFoundException } from "@nestjs/common";
//user imports
import { UserLogsInput } from "../inputs/user-logs.input";
import { UserLogsPayload } from "../dto/user-logs.payload";
import { UserLogs } from "../entities/user-logs.entity.logs";
import { UserLogsService } from "../services/userLogs.service.logs";


@Resolver(() => UserLogs)
export class UserLogsResolver {
	constructor(private readonly userLogsService: UserLogsService) { }

	//queries

	@Query(() => UserLogsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllUserLogs')
  async findAllUserLogs(@Args('userLogsInput') userLogsInput: UserLogsInput): Promise<UserLogsPayload> {
    const userLogs = await this.userLogsService.fetchAll(userLogsInput)
    if (userLogs) {
      return {
        ...userLogs,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'UserLogs not found',
    });
  }

}