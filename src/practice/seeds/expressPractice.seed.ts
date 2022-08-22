import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { User } from "src/users/entities/user.entity";
import { Role } from "src/users/entities/role.entity";
import { Practice } from "../entities/practice.entity";
import { Staff } from "src/providers/entities/staff.entity";
import { Doctor } from "src/providers/entities/doctor.entity";
import { Contact } from "src/providers/entities/contact.entity";
import { Facility } from "src/facilities/entities/facility.entity";
//helpers & constants
import { seedPractice } from "src/lib/constants";
import { createPasswordHash, createToken } from "src/lib/helper";
// seeder data
import { FacilitiesData, PracticeAdminInfo, PracticeInfo, PracticeUsersData } from "./practiceSeed-data";


@Injectable()
export class CreateExpressPractice implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      //repos
      const userRepo = getRepository(User);
      const rolesRepo = getRepository(Role);
      const staffRepo = getRepository(Staff);
      const doctorRepo = getRepository(Doctor);
      const contactRepo = getRepository(Contact);
      const practiceRepo = getRepository(Practice);
      const facilityRepo = getRepository(Facility);

      //variables
      let savedPractice: null | Practice = null;
      let savedFacilities: null | Facility[] = null;
      let practiceAdmin: null | User = null

      //fetch old express practice
      savedPractice = await practiceRepo.findOne({ practiceId: seedPractice.EXPRESS_HEALTH_CARE });
      if (!savedPractice) {
        const practiceInstance = await practiceRepo.create(PracticeInfo)
        savedPractice = await practiceRepo.save(practiceInstance);
      }

      //find roles & role's permissions
      const roles = await rolesRepo.find()
      const practiceAdminRole = roles.find((role) => role.role === 'practice-admin');

      //create Facilities of express health care
      savedFacilities = await Promise.all(FacilitiesData.map(async (facilityData) => {
        const { name, practiceType, address1, ...facilityContactInfo } = facilityData;

        //existing facility
        const facilityExist = await facilityRepo.findOne({ name, practiceId: savedPractice?.id })
        if (facilityExist) {
          return facilityExist
        }

        //create new facility 
        const facilityInstance = facilityRepo.create({ name, practiceType });

        //associate facility's practice
        facilityInstance.practice = savedPractice
        facilityInstance.practiceId = savedPractice?.id

        //create facility's contacts
        const facilityContact = contactRepo.create({ ...facilityContactInfo, address: address1, primaryContact: true })
        const contact = await contactRepo.save(facilityContact);

        //associate facility's contact
        facilityInstance.contacts = [contact]

        //save facility
        return await facilityRepo.save(facilityInstance);
      }))

      //create  express practice's users
      const createdUsers = await Promise.all(PracticeUsersData.map(async (userData) => {
        const { email, facility, phone, role: userRole } = userData;
        const existingUser = await userRepo.findOne({ email: email });

        if (existingUser) {
          return existingUser
        }

        //get user role
        const roleInfo = roles.find((role) => role.role === userRole);

        //get user role facility
        const facilityInfo = await savedFacilities.find((savedFacility) => savedFacility.name === facility)

        //create user 
        const userInstance = userRepo.create({ email, phone })
        userInstance.roles = [roleInfo]

        const token = createToken()
        userInstance.token = token;

        userInstance.facility = facilityInfo
        userInstance.facilityId = facilityInfo?.id
        userInstance.userType = userRole
        userInstance.password = await createPasswordHash('admin123');
        const savedUser = await userRepo.save(userInstance)

        return savedUser;
      }))

      //create express practice's staff/doctor
      await Promise.all(createdUsers.map(async (createdUser) => {
        const { email, facility, name, phone, role: userRole, suffix } = PracticeUsersData.find((userData) => userData.email === createdUser.email)
        const [firstName, lastName] = name.split(' ');

        const facilityInfo = savedFacilities.find((savedFacility) => savedFacility.name === facility)

        if (userRole === 'doctor') {
          const doctorExist = await doctorRepo.findOne({ email })
          if (!doctorExist) {
            //create doctor contacts
            const doctorContact = contactRepo.create({ email, phone, primaryContact: true })
            const contact = await contactRepo.save(doctorContact);

            //create doctor
            const doctorInstance = doctorRepo.create({ email, firstName, lastName, suffix });

            //associate contact
            doctorInstance.contacts = [contact]

            //associate facility
            doctorInstance.facility = facilityInfo
            doctorInstance.facilityId = facilityInfo?.id

            //associate practice
            doctorInstance.practiceId = savedPractice?.id

            //save doctor
            const savedDoctor = await doctorRepo.save(doctorInstance);

            //associate doctor
            createdUser.userId = savedDoctor.id
          }
        } else {
          const staffExist = await staffRepo.findOne({ email })
          if (!staffExist) {
            const staffInstance = staffRepo.create({ firstName, lastName, email, phone });

            staffInstance.user = createdUser;
            staffInstance.facility = facilityInfo
            staffInstance.facilityId = facilityInfo?.id
            const savedStaff = await staffRepo.save(staffInstance)
            createdUser.userId = savedStaff.id
          }
        }
        return createdUser;
      }))

      //get practice admin
      practiceAdmin = await userRepo.findOne({ email: PracticeAdminInfo.email })

      //create practice admin
      if (!practiceAdmin) {
        //create user
        const adminUserInstance = userRepo.create({ email: PracticeAdminInfo.email, facility: savedFacilities[0] })
        adminUserInstance.password = await createPasswordHash('admin123');
        adminUserInstance.userType = 'practice-admin'
        practiceAdmin.roles = [practiceAdminRole]
        practiceAdmin = await userRepo.save(adminUserInstance)

        //create staff 
        const practiceAdminInstance = staffRepo.create({ ...PracticeAdminInfo })
        practiceAdminInstance.user = practiceAdmin
        practiceAdminInstance.facility = savedFacilities[0]
        practiceAdminInstance.facilityId = savedFacilities[0]?.id
        practiceAdminInstance.practice = savedPractice
        practiceAdminInstance.practiceId = savedPractice?.id
        const savedPracticeAdmin = await staffRepo.save(practiceAdminInstance);

        //associate staff
        practiceAdmin.userId = savedPracticeAdmin.id
        await userRepo.save(practiceAdmin)
      }

      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

}