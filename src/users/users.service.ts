import { ConflictException, ForbiddenException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FacilityService } from 'src/facilities/facility.service';
import { MailerService } from 'src/mailer/mailer.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { getConnection, Not, Repository } from 'typeorm';
import { createToken } from '../lib/helper';
import { AccessUserPayload } from './dto/access-user.dto';
import { RegisterUserInput } from './dto/register-user-input.dto';
import { UpdatePasswordInput } from './dto/update-password-input.dto';
import { UpdateRoleInput } from './dto/update-role-input.dto';
import { ResendVerificationEmail, UpdateUserInput } from './dto/update-user-input.dto';
import { UserIdInput } from './dto/user-id-input.dto';
import UsersInput from './dto/users-input.dto';
import { UsersPayload } from './dto/users-payload.dto';
import { Role, UserRole } from './entities/role.entity';
import { UserLog } from './entities/user-logs.entity';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserLog)
    private UserLogRepository: Repository<UserLog>,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    private readonly mailerService: MailerService
  ) { }

  /**
   * Creates users service
   * @param registerUserInput 
   * @returns created user
   */
  async create(registerUserInput: RegisterUserInput): Promise<User> {
    try {
      const admin = await this.findById(registerUserInput.adminId)
      if (admin) {
        const existingUser = await this.findOneByEmail(registerUserInput.email.trim().toLowerCase());
        if (existingUser) {
          throw new ForbiddenException({
            status: HttpStatus.FORBIDDEN,
            error: 'User already exists with this email',
          });
        }
        // User Creation
        const userInstance = this.usersRepository.create({ ...registerUserInput, email: registerUserInput.email.trim().toLowerCase() })
        const role = await this.rolesRepository.findOne({ role: registerUserInput.roleType });
        userInstance.roles = [role]
        //custom token creation
        const token = createToken();
        userInstance.token = token;
        //getting facility  
        const facility = await this.facilityService.findOne(registerUserInput.facilityId)
        userInstance.facility = facility
        //setting role type & custom userId
        userInstance.userType = role.role
        const user = await this.usersRepository.save(userInstance);
        //saving userId in user
        await this.saveUserId(user.id, userInstance)
        // SEND EMAIL TO USER FOR RESET PASSWORD
        const isInvite = true;
        if (registerUserInput.roleType != UserRole.PATIENT) {
          this.mailerService.sendEmailForgotPassword(user.email, user.email, user.id, user.emailVerified, token, isInvite)
        }
        return user;
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Admin not found or disabled',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Resends verification email
   * @param resendVerificationEmail 
   * @returns verification email 
   */
  async resendVerificationEmail(resendVerificationEmail: ResendVerificationEmail): Promise<User> {
    try {
      const user = await this.findOne(resendVerificationEmail.email);
      const token = createToken();
      user.token = token;
      const isAdmin = user && user.roles.some(roleItem => roleItem.role.includes('super-admin' || 'admin'))
      if (!user) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: "User doesn't exist",
        });
      }
      //SEND EMAIL TO USER FOR EMAIL VERIFICATION
      this.mailerService.sendVerificationEmail(user.email, user.email, user.id, isAdmin, token)
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates users service
   * @param updateUserInput 
   * @returns update user
   */
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const user = await this.findById(updateUserInput.id);
      if (user.email != updateUserInput.email) {
        const updatedUser = await this.findOneByEmail(updateUserInput.email);
        if (updatedUser) {
          throw new ConflictException({
            status: HttpStatus.CONFLICT,
            error: 'User associated with this email already exists',
          });
        }
        return this.usersRepository.save({ ...user, ...updateUserInput })
      }
      return this.usersRepository.save({ ...user, ...updateUserInput })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates role
   * @param updateRoleInput 
   * @returns role 
   */
  async updateRole(updateRoleInput: UpdateRoleInput): Promise<User> {
    try {
      const { roles } = updateRoleInput
      const isSuperAdmin = roles.find(item => item === UserRole.SUPER_ADMIN)
      if (isSuperAdmin) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'Can not assign this role to user',
        });
      }
      const user = await this.findById(updateRoleInput.id);
      if (user) {
        const fetchdRoles = await getConnection()
          .getRepository(Role)
          .createQueryBuilder("role")
          .where("role.role IN (:...roles)", { roles })
          .getMany();
        user.roles = fetchdRoles
        return await this.usersRepository.save(user);
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      });

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all
   * @param usersInput 
   * @returns paginated users results
   */
  async findAll(usersInput: UsersInput): Promise<UsersPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<User>(this.usersRepository, { ...usersInput, associatedTo: 'Roles', relationField: 'roles', associatedToField: { columnValue: usersInput.role, columnName: 'role', filterType: 'enumFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        users: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  /**
  * Searchs users service
  * @param searchTerm 
  * @returns users by searchTerms 
  */
  async search(searchTerm: string): Promise<User[]> {
    const [first, last] = searchTerm.split(' ');
    console.log(first, last)
    const result = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.roles", "role")
      .where('user.firstName ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('user.lastName ILIKE :searchTerm', { searchTerm: `%${last}%` })
      .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getMany();
    return result;
  }
  /**
   * Finds User by Email
   * @param email 
   * @returns one user
   */
  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email, status: UserStatus.ACTIVE });
  }

  /**
   * Finds one by email
   * @param email 
   * @returns one by email 
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }

  async saveUserId(id: string, userInstance: User): Promise<User> {
    userInstance.userId = id
    return await this.usersRepository.save(userInstance);
  }

  /**
   * Finds User by id
   * @param id 
   * @returns by id 
   */
  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({ id, status: UserStatus.ACTIVE });
  }

  /**
   * Finds user by id
   * @param id 
   * @returns user by id 
   */
  async findUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findByToken(token: string): Promise<User> {
    return await this.usersRepository.findOne({ token: token });
  }

  /**
   * Removes users 
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<void> {
    const user = await this.findUserById(id);
    await this.usersRepository.delete(user.id);
  }

  async removeUser(userIdInput: UserIdInput): Promise<void> {
    try {
      const admin = await this.findById(userIdInput.adminId)
      if (admin) {
        return await this.remove(userIdInput.userId);
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Admin not found or disabled',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deactivates user
   * @param id 
   * @returns user 
   */
  async deactivateUser(id: string): Promise<User> {
    try {
      const user = await this.findById(id);
      if (user) {
        if ([UserRole.SUPER_ADMIN].every(i => user.roles.map(role => role.role).includes(i))) {
          throw new ForbiddenException({
            status: HttpStatus.FORBIDDEN,
            error: "Super Admin can't be deactivated",
          });
        }
        user.status = UserStatus.DEACTIVATED;
        return await this.usersRepository.save(user);
      }
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'User already Deactivated',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Activates user
   * @param id 
   * @returns user 
   */
  async activateUser(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ id })
      user.status = UserStatus.ACTIVE;
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  /**
   * Creates token
   * @param user 
   * @param paramPass 
   * @returns token 
   */
  async createToken(user: User, paramPass: string): Promise<AccessUserPayload> {
    const passwordMatch = await bcrypt.compare(paramPass, user.password)
    if (passwordMatch) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        roles: user.roles,
        response: {
          message: "OK", status: 200, name: "Token Created"
        }
      };
    } else {
      return {
        response: {
          message: "Incorrect Email or Password", status: 404, name: "Email or Password invalid"
        }, access_token: null, roles: []
      };
    }
  }

  /**
   * Validates user
   * @param email 
   * @param pass 
   * @returns user 
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findOne(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password)
      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  /**
   * Logins users service
   * @param user 
   * @returns access token object
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Verifys users service
   * @param token 
   * @returns  jwt object with roles
   */
  async verify(token: string) {
    const secret = await this.jwtService.verify(token);
    const user = await this.findRolesByUserId(secret.sub)
    return {
      ...secret,
      roles: user.roles.map(role => role.role)
    };
  }

  /**
   * Finds roles by user id
   * @param id 
   * @returns roles by user id 
   */
  async findRolesByUserId(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE
      },
      relations: ["roles"], select: ['id']
    });
  }

  /**
   * Forgots password
   * @param email 
   * @returns password 
   */
  async forgotPassword(email: string): Promise<User> {
    try {
      const user = await this.findOne(email)
      const token = createToken();
      user.token = token;
      const roles = user.roles.map(u => u.role);
      if (user) {
        const isAdmin = roles.some(role => role.includes('admin' || 'super-admin'))
        const isInvite = false;
        this.mailerService.sendEmailForgotPassword(user.email, user.id, `${user.email} ${user.email}`, isAdmin, token, isInvite)
        delete user.roles
        await this.usersRepository.save(user);
        return user
      }
      return user
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Verifys email
   * @param token 
   * @returns email 
   */
  async verifyEmail(token: string): Promise<User> {
    try {
      // Find Token in user records
      const user = await this.findByToken(token)
      if (user) {
        user.emailVerified = true;
        user.token = null;
        await this.usersRepository.save(user);
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Resets password
   * @param password 
   * @param token 
   * @returns user 
   */
  async resetPassword(password: string, token: string): Promise<User | undefined> {
    try {
      const userObj = await this.findByToken(token)
      if (userObj) {
        const user = await this.findById(userObj.id);
        delete user.token;
        user.password = password;
        user.emailVerified = true
        const updatedUser = await this.usersRepository.save(user);
        return updatedUser;
      }
      return undefined;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  /**
   * Updates password
   * @param updatePasswordInput 
   * @returns password 
   */
  async updatePassword(updatePasswordInput: UpdatePasswordInput): Promise<User | undefined> {
    try {
      const user = await this.findById(updatePasswordInput.id);
      const oldPassword = await bcrypt.compare(updatePasswordInput.oldPassword, user.password)
      if (oldPassword) {
        user.password = updatePasswordInput.newPassword
        const updatedUser = await this.usersRepository.save(user);
        return updatedUser;
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Old password do not match',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all roles
   * @returns all roles 
   */
  findAllRoles(): Promise<Role[]> {
    try {
      return this.rolesRepository.find({
        where: {
          role: Not(UserRole.SUPER_ADMIN)
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets admins
   * @returns admins 
   */
  async getAdmins(): Promise<Array<string>> {
    try {
      const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder("users")
        .innerJoinAndSelect('users.roles', 'role')
        .where('role.role = :roleType1', { roleType1: UserRole.ADMIN })
        .orWhere('role.role = :roleType2', { roleType2: UserRole.SUPER_ADMIN })
        .getMany();
      return users.map(u => u.email);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets admin ids
   * @returns admin ids 
   */
  async getAdminIDS(): Promise<Array<string>> {
    try {
      const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder("users")
        .innerJoinAndSelect('users.roles', 'role')
        .where('role.role = :roleType1', { roleType1: UserRole.ADMIN })
        .orWhere('role.role = :roleType2', { roleType2: UserRole.SUPER_ADMIN })
        .getMany();
      return users.map(u => u.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
