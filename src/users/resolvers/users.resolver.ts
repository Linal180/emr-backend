import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  ForbiddenException, HttpStatus, NotFoundException, PreconditionFailedException, SetMetadata, UnauthorizedException,
  UseFilters, UseGuards
} from '@nestjs/common';
//entities
import { User } from '../entities/user.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//services
import { UtilsService } from 'src/util/utils.service';
import { UsersService } from '../services/users.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
//inputs
import UsersInput from '../dto/users-input.dto';
import { UserIdInput } from '../dto/user-id-input.dto';
import { VerifyCodeInput } from '../dto/verify-code.dto';
import { UserInfoInput } from '../dto/user-info-input.dto';
import { TwoFactorInput } from '../dto/twoFactor-input.dto';
import { LoginUserInput } from '../dto/login-user-input.dto';
import { UpdateRoleInput } from '../dto/update-role-input.dto';
import { VerifyEmailInput } from '../dto/verify-email-input.dto';
import { RegisterUserInput } from '../dto/register-user-input.dto';
import { ForgotPasswordInput } from '../dto/forget-password-input.dto';
import { UpdatePasswordInput } from '../dto/update-password-input.dto';
import { EmergencyAccessUserInput } from '../dto/emergency-access-user-input.dto';
import { GetUser, ResendVerificationEmail, UpdateUserInput } from '../dto/update-user-input.dto';
//payloads
import RolesPayload from '../dto/roles-payload.dto';
import { UsersPayload } from '../dto/users-payload.dto';
import { AccessUserPayload } from '../dto/access-user.dto';
import { UserPayload } from '../dto/register-user-payload.dto';
import { ResetPasswordInput } from '../dto/reset-password-input.dto';
import { ForgotPasswordPayload } from '../dto/forgot-password-payload.dto';
import { EmergencyAccessUserPayload } from '../dto/emergency-access-user-payload';
import { CurrentUser2FaInterface, CurrentUserInterface } from '../auth/dto/current-user.dto';
//guards
import { Jwt2FAGuard } from '../auth/jwt-2fa.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//decorators, exceptions
import { HttpExceptionFilterGql } from 'src/exception-filter';
import { CurrentUser } from '../../customDecorators/current-user.decorator';

@Resolver(() => User)
@UseFilters(HttpExceptionFilterGql)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly attachmentsService: AttachmentsService
  ) { }

  // Queries 
  @Query(() => UsersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllUsers')
  async fetchAllUsers(@Args('userInput') usersInput: UsersInput): Promise<UsersPayload> {
    const response = await this.usersService.findAll(usersInput);
    const {users } = response
    if (users?.length) {
      return {
        ...response,
        response: { status: 200, message: "OK" },
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Users not found',
    });
  }

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  async fetchUser(@CurrentUser() user: CurrentUserInterface): Promise<UserPayload> {
    const userFound = await this.usersService.findOne(user.email);
    return { user: userFound, response: { status: 200, message: 'User Data' } }
  }

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getUser')
  async getUser(@Args('getUser') getUser: GetUser): Promise<UserPayload> {
    const userFound = await this.usersService.findUserById(getUser.id);
    return { user: userFound, response: { status: 200, message: 'User Data' } }
  }

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'me')
  @SetMetadata('type', 'Read')
  async me(@CurrentUser() user: CurrentUserInterface): Promise<UserPayload> {
    const userFound = await this.usersService.findOne(user.email)
    if (!userFound) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'User Does not exist',
      });
    }
    else if (userFound && userFound.emailVerified) {
      return { user: userFound, response: { status: 200, message: 'User Data' } }
    }
    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'Email changed or not verified, please verify your email',
    });
  }

  @Query(() => RolesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllRoles')
  async fetchAllRoles(): Promise<RolesPayload> {
    const roles = await this.usersService.findAllRoles()
    if (roles) {
      return {
        roles,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Query(() => UsersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'searchUser')
  async searchUser(@Args('search') searchTerm: string): Promise<UsersPayload> {
    const users = await this.usersService.search(searchTerm);
    return { users, response: { status: 200, message: 'User Data fetched successfully' } }
  }

  @Query(() => EmergencyAccessUserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchEmergencyAccessUsers')
  async fetchEmergencyAccessUsers(@Args('emergencyAccessUsersInput') emergencyAccessUsersInput: EmergencyAccessUserInput): Promise<EmergencyAccessUserPayload> {
    const users = await this.usersService.fetchEmergencyAccessRoleUsers(emergencyAccessUsersInput);
    return { ...users, response: { status: 200, message: 'User Data fetched successfully' } }
  }

  //mutations

  @Mutation(() => AccessUserPayload)
  async login(@Args('loginUser') loginUserInput: LoginUserInput): Promise<AccessUserPayload> {
    const { email, password } = loginUserInput
    const user = await this.usersService.findOne(email.trim().toLowerCase())
    if (user) {
      if (user.emailVerified) {
        if (user.isTwoFactorEnabled) {
          this.utilsService.sendVerificationCode(user.phone)
          return await this.usersService.create2FAToken(user, password)
        }

        return await this.usersService.createToken(user, password);
      }
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'Email changed or not verified, please verify your email',
      });
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Mutation(() => UserPayload)
  @UseGuards(Jwt2FAGuard)
  async verifyOTP(@CurrentUser() user: CurrentUser2FaInterface,
    @Args('verifyCodeInput') verifyCodeInput: VerifyCodeInput): Promise<UserPayload> {
    const { id } = user
    const { otpCode } = verifyCodeInput
    const newUser = await this.usersService.findUserById(id)
    if (newUser) {
      const verifyOTP = await this.utilsService.verifyOTPCode(newUser.phone, otpCode)
      if (verifyOTP) {
        const token = await this.usersService.createLoginToken(newUser);
        const { access_token } = token
        return {
          user: newUser,
          access_token,
          response: { status: 200, message: 'OTP has been successfully verified.' }
        }
      } else {
        throw new PreconditionFailedException({
          status: HttpStatus.PRECONDITION_FAILED,
          error: 'OTP code could not verify, Resend again',
        });
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Mutation(() => UserPayload)
  @UseGuards(Jwt2FAGuard)
  async resentOTP(@CurrentUser() authUser: CurrentUser2FaInterface): Promise<UserPayload> {
    const { id } = authUser
    const user = await this.usersService.findUserById(id)
    if (user) {
      await this.utilsService.sendVerificationCode(user.phone)
      return {
        user: null,
        response: { status: 200, message: 'OTP has been sent again successfully.' }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Mutation(returns => UserPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'registerUser')
  async registerUser(@Args('user') registerUserInput: RegisterUserInput): Promise<UserPayload> {
    return {
      user: await this.usersService.create(registerUserInput),
      response: { status: 200, message: 'An email has been sent to you, check your email for verification' }
    };
  }

  @Mutation(returns => ForgotPasswordPayload)
  async forgotPassword(@Args('forgotPassword') forgotPasswordInput: ForgotPasswordInput): Promise<ForgotPasswordPayload> {
    const { email } = forgotPasswordInput
    const user = await this.usersService.forgotPassword(email.trim().toLowerCase())
    if (user) {
      return { response: { status: 200, message: 'Forgot Password Email Sent to User' } }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Mutation(returns => UserPayload)
  async verifyEmail(@Args('verifyEmail') { token }: VerifyEmailInput): Promise<UserPayload> {
    const user = await this.usersService.verifyEmail(token)
    if (user) {
      return { user, response: { status: 200, message: "Email verified successfully", name: "Email Verified Successfully" } }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Token not found',
    });
  }

  @Mutation(returns => UserPayload)
  async resendVerificationEmail(@Args('resendVerificationEmail') resendVerificationEmail: ResendVerificationEmail): Promise<UserPayload> {
    return {
      user: await this.usersService.resendVerificationEmail(resendVerificationEmail),
      response: { status: 200, message: 'An email has been sent to you, check your email for verification' }
    };
  }

  @Mutation(returns => UserPayload)
  async updateAutoLogoutTime(@Args('userInfoInput') userInfoInput: UserInfoInput): Promise<UserPayload> {
    return {
      user: await this.usersService.updateUserInfo(userInfoInput),
      response: { status: 200, message: 'Logout time updated' }
    };
  }


  @Mutation(returns => UserPayload)
  async resetPassword(@Args('resetPassword') resetPasswordInput: ResetPasswordInput): Promise<UserPayload> {
    const { token, password } = resetPasswordInput
    const user = await this.usersService.resetPassword(password, token)
    if (user) {
      return { user, response: { status: 200, message: "Password reset successfully", name: "PasswordReset successfully" } }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Token not found',
    });
  }

  @Mutation(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  async updatePassword(@Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput): Promise<UserPayload> {
    const user = await this.usersService.updatePassword(updatePasswordInput)
    if (user) {
      return { user, response: { status: 200, message: "Password updated successfully" } }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'deactivateUser')
  async deactivateUser(@Args('user') { userId }: UserIdInput): Promise<UserPayload> {
    const user = await this.usersService.deactivateUser(userId);
    return { user, response: { status: 200, message: 'User Deactivated' } }
  }

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeUser')
  async removeUser(@Args('userIdInput') userIdInput: UserIdInput) {
    await this.usersService.removeUser(userIdInput);
    return { response: { status: 200, message: 'User Deleted' } }
  }

  @Mutation(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'activateUser')
  async activateUser(@Args('user') { userId }: UserIdInput): Promise<UserPayload> {
    const user = await this.usersService.activateUser(userId);
    return { user, response: { status: 200, message: 'User Activated' } }
  }

  @Mutation(() => UserPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateTwoFactorAuth')
  async update2FactorAuth(@Args('twoFactorInput') twoFactorInput: TwoFactorInput): Promise<UserPayload> {
    const user = await this.usersService.updateTwoFactorAuth(twoFactorInput);
    return { user, response: { status: 200, message: 'User 2FA Updated' } }
  }

  @Mutation(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateUser')
  async updateUser(@Args('user') updateUserInput: UpdateUserInput): Promise<UserPayload> {
    const user = await this.usersService.update(updateUserInput);
    return { user, response: { status: 200, message: 'User Data updated successfully' } }
  }

  @Mutation(() => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateRole')
  async updateUserRole(@Args('user') updateRoleInput: UpdateRoleInput): Promise<UserPayload> {
    const user = await this.usersService.updateUserRole(updateRoleInput);
    return { user, response: { status: 200, message: 'User Data updated successfully' } }
  }

  //resolve fields

  @ResolveField(() => [Attachment])
  async attachments(@Parent() user: User): Promise<Attachment[]> {
    if (user) {
      return await this.attachmentsService.findAttachments(user.id, AttachmentType.SUPER_ADMIN);
    }
  }
}
