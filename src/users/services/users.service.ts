import { ConflictException, ForbiddenException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { getConnection, Not, Repository } from 'typeorm';
//user import
import { AttachmentsService } from 'src/attachments/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { UtilsService } from 'src/util/utils.service';
import { FacilityService } from '../../facilities/services/facility.service';
import { createToken } from '../../lib/helper';
import { EmergencyAccessUserInput } from '../dto/emergency-access-user-input.dto';
import { EmergencyAccessUserPayload } from '../dto/emergency-access-user-payload';
import { TwoFactorInput } from '../dto/twoFactor-input.dto';
import { AccessUserPayload } from './../dto/access-user.dto';
import { RegisterUserInput } from './../dto/register-user-input.dto';
import { UpdatePasswordInput } from './../dto/update-password-input.dto';
import { UpdateRoleInput } from './../dto/update-role-input.dto';
import { ResendVerificationEmail, UpdateUserInput } from './../dto/update-user-input.dto';
import { UserIdInput } from './../dto/user-id-input.dto';
import UsersInput from './../dto/users-input.dto';
import { UsersPayload } from './../dto/users-payload.dto';
import { Role } from './../entities/role.entity';
import { UserLog } from './../entities/user-logs.entity';
import { User, UserStatus } from './../entities/user.entity';
import { RolesService } from './roles.service';
import { File } from 'src/aws/dto/file-input.dto';

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
    private readonly mailerService: MailerService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService,
    private readonly rolesService: RolesService,
    private readonly attachmentsService: AttachmentsService,
  ) { }


  /**
   * Creates users service
   * @param registerUserInput 
   * @returns create 
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
        await this.saveUserId(user.id, user);
        // SEND EMAIL TO USER FOR RESET PASSWORD
        let isInvite = 'INVITATION_TEMPLATE_ID';
        let isAdmin = false
        const roles = await this.findAllRoles()
        const patientRole = roles.find((item) => item.role === 'patient')
        if(registerUserInput.roleType !== patientRole.role){
        this.mailerService.sendEmailForgotPassword(user.email, user.id, user.email, '', isAdmin, token, isInvite)
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
   * Saves users service
   * @param user 
   * @returns save 
   */
  async save(user: User): Promise<User>{
    return await this.usersRepository.save(user)
  }
  /**
   * Updates role
   * @param updateRoleInput 
   * @returns role 
   */
  async updateUserRole(updateRoleInput: UpdateRoleInput): Promise<User> {
    try {
      const { roles } = updateRoleInput
      console.log("roles",roles);
      const isSuperAdmin = roles.includes("super-admin"); 
      if (isSuperAdmin) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'Can not assign this role to user',
        });
      }
      const user = await this.findUserById(updateRoleInput.id);
      if (user) {
        const fetchRoles = await getConnection()
          .getRepository(Role)
          .createQueryBuilder("role")
          .where("role.role IN (:...roles)", { roles })
          .getMany();
          console.log("fetchRoles",fetchRoles);
        user.roles = fetchRoles
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

  async fetchEmergencyAccessRoleUsers(emergencyAccessUsersInput:EmergencyAccessUserInput):Promise<EmergencyAccessUserPayload>{
    const {page,limit}=emergencyAccessUsersInput.paginationInput

    if(emergencyAccessUsersInput.email){
      const [emergencyAccessUsers,totalCount]=await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .skip((page-1)*limit)
      .take(limit)
      .innerJoin(qb2 => {
        return qb2
        .select('user.id', 'id')
        .from(User, 'user')
        .innerJoin('user.roles', 'userRoles')
        .where('userRoles.role = :role', { role:'emergency-access' });
      }, 'userWithCertainRole', 'user.id = "userWithCertainRole".id')
      .leftJoinAndSelect('user.roles', 'userRoles')
      .where('user.email like :email',{email:`%${emergencyAccessUsersInput.email}%`})
      .getManyAndCount()

      const totalPages=Math.ceil(totalCount / limit)

      return {
        pagination:{
          totalCount,
          page,
          limit,
          totalPages,
        },
        emergencyAccessUsers
      }
    }
    
    if(emergencyAccessUsersInput.facilityId){
      const [emergencyAccessUsers,totalCount]=await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .skip((page-1)*limit)
      .take(limit)
      .innerJoin(qb2 => {
        return qb2
        .select('user.id', 'id')
        .from(User, 'user')
        .innerJoin('user.roles', 'userRoles')
        .where('userRoles.role = :role', { role:'emergency-access' });
      }, 'userWithCertainRole', 'user.id = "userWithCertainRole".id')
      .leftJoinAndSelect('user.roles', 'userRoles')
      .where('user.facilityId = :facilityId',{facilityId:emergencyAccessUsersInput.facilityId})
      .getManyAndCount()

      const totalPages=Math.ceil(totalCount / limit)

      return {
        pagination:{
          totalCount,
          page,
          limit,
          totalPages,
        },
        emergencyAccessUsers
      }
    }
    
    // if(emergencyAccessUsersInput.practiceId){
    //   const [emergencyAccessUsers,totalCount]=await baseQuery
    //   .innerJoin(qb2 => {
    //     return qb2
    //     .select('user.id', 'id')
    //     .from(User, 'user')
    //     .innerJoin('user.facility', 'userFacility')
    //     .where('userFacility.practiceId = :practiceId', { practiceId:emergencyAccessUsersInput.practiceId });
    //   }, 'userWithCertainFacility', 'user.id = "userWithCertainFacility".id')
    //   .leftJoinAndSelect('user.facility', 'userFacility')
    //   .where('user.facilityId = :facilityId',{facilityId:emergencyAccessUsersInput.facilityId })
    //   .getManyAndCount()
      
    //   const totalPages=Math.ceil(totalCount / limit)

    //   return {
    //     pagination:{
    //       totalCount,
    //       page,
    //       limit,
    //       totalPages,
    //     },
    //     emergencyAccessUsers
    //   }
    // }

    const [emergencyAccessUsers,totalCount]=  await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .skip((page-1)*limit)
    .take(limit)
    .innerJoin(qb2 => {
      return qb2
      .select('user.id', 'id')
      .from(User, 'user')
      .innerJoin('user.roles', 'userRoles')
      .where('userRoles.role = :role', { role:'emergency-access' });
    }, 'userWithCertainRole', 'user.id = "userWithCertainRole".id')
    .leftJoinAndSelect('user.roles', 'userRoles')
    .getManyAndCount()

    const totalPages=Math.ceil(totalCount / limit)
     
    return {
      pagination:{
        totalCount,
        page,
        limit,
        totalPages,
      },
      emergencyAccessUsers
    }
  }

  /**
   * Finds all
   * @param usersInput 
   * @returns paginated users results
   */
  async findAll(usersInput: UsersInput): Promise<UsersPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<User>(this.usersRepository, usersInput)
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
    const user = await this.usersRepository.findOne({ email: email, status: UserStatus.ACTIVE });
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      });
    }
    return user;
  }

  /**
   * Finds one by email
   * @param email 
   * @returns one by email 
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email.trim().toLowerCase() });
  }

  async saveUserId(id: string, userInstance: User): Promise<User> {
    userInstance.userId = id
    return await this.usersRepository.save(userInstance);
  }

  async updateFacility(facility: Facility, userInstance: User): Promise<User> {
    userInstance.facility = facility
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

  /**
   * Finds user by user id
   * @param id 
   * @returns user by user id 
   */
  async findUserByUserId(id: string): Promise<User> {
    return await this.usersRepository.findOne({userId: id});
  }

  /**
   * Finds by token
   * @param token 
   * @returns by token 
   */
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

  /**
   * Removes user
   * @param userIdInput 
   * @returns user 
   */
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
      const allRoles = await this.findAllRoles()
      const superAdmin = allRoles.find((item) => item.role === 'super-admin')
      if (user) {
        if ([superAdmin.role].every(i => user.roles.map(role => role.role).includes(i))) {
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
   * Updates two factor auth
   * @param twoFactorInput 
   * @returns two factor auth 
   */
  async updateTwoFactorAuth(twoFactorInput: TwoFactorInput): Promise<User> {
    try {
      const user = await this.findUserById(twoFactorInput.userId)
      if(!user){
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'User not found or disabled',
        });
      }
      const passwordMatch = await bcrypt.compare(twoFactorInput.password, user.password)
      if (passwordMatch) {
      return await this.utilsService.updateEntityManager(User, twoFactorInput.userId, {isTwoFactorEnabled:twoFactorInput.isTwoFactorEnabled }, this.usersRepository)
      }else{
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Password invalid',
        });
      }
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
        userId: user.id,
        roles: user.roles,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
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
      // roles: user.roles.map(role => role.role)
      roles: user.roles
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
        const isAdmin = roles.some(role => role.includes('patient'))
        const isInvite = 'FORGOT_PASSWORD_TEMPLATE_ID';
        this.mailerService.sendEmailForgotPassword(user.email, user.id, `${user.email} ${user.email}`, '',isAdmin, token, isInvite)
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
        await this.patientService.updatePatientInvite(user.userId)
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
          role: Not('super-admin')
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
      const allRoles = await this.findAllRoles()
      const admin = allRoles.find((item) => item.role === 'admin')
      const superAdmin = allRoles.find((item) => item.role === 'super-admin')
      const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder("users")
        .innerJoinAndSelect('users.roles', 'role')
        .where('role.role = :roleType1', { roleType1: admin })
        .orWhere('role.role = :roleType2', { roleType2: superAdmin })
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
      const allRoles = await this.findAllRoles()
      const admin = allRoles.find((item) => item.role === 'admin')
      const superAdmin = allRoles.find((item) => item.role === 'super-admin')
      const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder("users")
        .innerJoinAndSelect('users.roles', 'role')
        .where('role.role = :roleType1', { roleType1: admin })
        .orWhere('role.role = :roleType2', { roleType2: superAdmin })
        .getMany();
      return users.map(u => u.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Uploads user media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns user media 
   */
  async uploadUserMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<User> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.SUPER_ADMIN;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const user = await this.findById(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return user;
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes user media
   * @param id 
   * @returns  
   */
  async removeUserMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets user media
   * @param id 
   * @returns  
   */
  async getUserMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<User> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.DOCTOR
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const user = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return user
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
