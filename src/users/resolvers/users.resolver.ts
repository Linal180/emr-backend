import { ForbiddenException, HttpStatus, NotFoundException, PreconditionFailedException, SetMetadata, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpExceptionFilterGql } from 'src/exception-filter';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { UtilsService } from 'src/util/utils.service';
import { CurrentUser } from '../../customDecorators/current-user.decorator';
import { CurrentUserInterface } from '../auth/dto/current-user.dto';
import { AccessUserPayload } from '../dto/access-user.dto';
import { ForgotPasswordInput } from '../dto/forget-password-input.dto';
import { ForgotPasswordPayload } from '../dto/forgot-password-payload.dto';
import { LoginUserInput } from '../dto/login-user-input.dto';
import { RegisterUserInput } from '../dto/register-user-input.dto';
import { UserPayload } from '../dto/register-user-payload.dto';
import { ResetPasswordInput } from '../dto/reset-password-input.dto';
import RolesPayload from '../dto/roles-payload.dto';
import { TwoFactorInput } from '../dto/twoFactor-input.dto';
import { UpdatePasswordInput } from '../dto/update-password-input.dto';
import { UpdateRoleInput } from '../dto/update-role-input.dto';
import { GetUser, ResendVerificationEmail, UpdateUserInput } from '../dto/update-user-input.dto';
import { UserIdInput } from '../dto/user-id-input.dto';
import UsersInput from '../dto/users-input.dto';
import { UsersPayload } from '../dto/users-payload.dto';
import { SeneOTPAgainInput, VerifyCodeInput } from '../dto/verify-code.dto';
import { VerifyEmailInput } from '../dto/verify-email-input.dto';
import { UsersService } from '../services/users.service';

@Resolver('users')
@UseFilters(HttpExceptionFilterGql)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) { }

  // Queries 
  @Query(returns => UsersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllUsers')
  async fetchAllUsers(@Args('userInput') usersInput: UsersInput): Promise<UsersPayload> {
    const users = await this.usersService.findAll(usersInput);
    if (users) {
      return {
        ...users,
        response: { status: 200, message: "OK" },
      }
    }
  }

  @Query(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard,PermissionGuard)
  async fetchUser(@CurrentUser() user: CurrentUserInterface): Promise<UserPayload> {
    const userFound = await this.usersService.findOne(user.email);
    return { user: userFound, response: { status: 200, message: 'User Data' } }
  }

  @Query(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard,PermissionGuard)
  @SetMetadata('name', 'getUser')
  async getUser(@Args('getUser') getUser: GetUser): Promise<UserPayload> {
    const userFound = await this.usersService.findUserById(getUser.id);
    return { user: userFound, response: { status: 200, message: 'User Data' } }
  }

  @Query(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard,PermissionGuard)
  async me(@CurrentUser() user: CurrentUserInterface): Promise<UserPayload> {
    const userFound = await this.usersService.findOne(user.email)
    console.log("userFound",userFound);
    console.log("userFound.roles[0].rolePermissions",userFound.roles[0].rolePermissions);
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

  @Query(returns => RolesPayload)
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

  @Query(returns => UsersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'searchUser')
  async searchUser(@Args('search') searchTerm: string): Promise<UsersPayload> {
    const users = await this.usersService.search(searchTerm);
    return { users, response: { status: 200, message: 'User Data fetched successfully' } }
  }

  @Mutation(returns => AccessUserPayload)
  async login(@Args('loginUser') loginUserInput: LoginUserInput): Promise<AccessUserPayload> {
    const { email, password } = loginUserInput
    const user = await this.usersService.findOne(email.trim().toLowerCase())
    if (user) {
      if (user.emailVerified) {
        if(user.isTwoFactorEnabled){
          await this.utilsService.sendVerificationCode(user.phone)
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

  @Mutation(returns => UserPayload)
  async verifyOTP(@Args('verifyCodeInput') verifyCodeInput: VerifyCodeInput): Promise<UserPayload> {
    const { id, otpCode } = verifyCodeInput
    const user = await this.usersService.findUserById(id)
    if(user){
       const verifyOTP = await this.utilsService.verifyOTPCode(user.phone, otpCode)
       if(verifyOTP){
         return {
          user: user,
          response: { status: 200, message: 'OTP has been successfully verified.' }
         }
       }else {
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

  @Mutation(returns => UserPayload)
  async resentOTP(@Args('seneOTPAgainInput') seneOTPAgainInput: SeneOTPAgainInput): Promise<UserPayload> {
    const { id } = seneOTPAgainInput
    const user = await this.usersService.findUserById(id)
    if(user){
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

  @Mutation(returns => UserPayload)
  async updatePassword(@Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput): Promise<UserPayload> {
    const user = await this.usersService.updatePassword(updatePasswordInput)
    if (user) {
      return { user, response: { status: 200, message: "Password updated successfully", name: "updatePassword successfully" } }
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

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'activateUser')
  async activateUser(@Args('user') { userId }: UserIdInput): Promise<UserPayload> {
    const user = await this.usersService.activateUser(userId);
    return { user, response: { status: 200, message: 'User Activated' } }
  }

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateTwoFactorAuth')
  async update2FactorAuth(@Args('twoFactorInput') twoFactorInput: TwoFactorInput): Promise<UserPayload> {
    const user = await this.usersService.updateTwoFactorAuth(twoFactorInput);
    return { user, response: { status: 200, message: 'User 2FA Updated' } }
  }

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateUser')
  async updateUser(@Args('user') updateUserInput: UpdateUserInput): Promise<UserPayload> {
    const user = await this.usersService.update(updateUserInput);
    return { user, response: { status: 200, message: 'User Data updated successfully' } }
  }

  @Mutation(returns => UserPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateRole')
  async updateUserRole(@Args('user') updateRoleInput: UpdateRoleInput): Promise<UserPayload> {
    const user = await this.usersService.updateUserRole(updateRoleInput);
    return { user, response: { status: 200, message: 'User Data updated successfully' } }
  }
}