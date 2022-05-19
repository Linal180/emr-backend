import { PracticeType, ServiceCode } from '../../facilities/entities/facility.entity';
import { UserStatus } from '../entities/user.entity';

export const FacilityData = [
    { name: "Private Facility", practiceType: PracticeType.HOSPITAL, code: "+02923", mammographyCertificationNumber: "232232", 
    cliaIdNumber: "023292", federalTaxId: "232232322", isPrivate: true, revenueCode: "323343433", npi: "232332",
    tamxonomyCode: "2322332", serviceCode: ServiceCode.EMERGENCY_ROOM_23 
    }
];

export const RolesData = [
    { role: 'super-admin', customRole: false, description: "super admin has all permissions" },
    { role: 'practice-admin', customRole: false, description: "admin has all permissions of any practice"},
    { role: 'facility-admin', customRole: false, description: "admin has all permissions of any facility"},
    { role: 'emergency-access', customRole: false, description: "emergency access role has facility-admin level permissions" },
    { role: 'doctor', customRole: true, description: "doctor has all permissions related to patients and their medical history" },
    { role: 'nurse', customRole: true, description: "nurse has permissions" },
    { role: 'patient', customRole: true,description: "patient has all permissions for patient portal" },
    { role: 'staff' , customRole: true, description: "staff has permissions for staff members and lab records"},
    { role: 'nurse-practitioner', customRole: true, description: "nurse practitioner has all permissions of facility's patients" },
    { role: 'office-manager', customRole: true, description: "office manager has administrative permissions" },
    { role: 'doctor-assistant', customRole: true, description: "doctor assistant has partial permissions of doctor" },
    { role: 'front-desk', customRole: true, description: "front desk assistant has partial permissions of admin" },
   
];

export const UsersData = [
    { firstName: "Khalid", lastName: "Rasool", password: "super123", email: "khalid.rasool@kwanso.com", status: UserStatus.ACTIVE, 
      phone: "+923426851938", userType: 'super-admin', roleType: 'super-admin', zipCode: "54000", emailVerified: true 
    },
];
 
export const PermissionData = [
    { name: 'emergencyAccess'  , moduleType: 'Emergency Access' },
    { name: 'fetchAllUsers' , moduleType: 'User'},
    { name: 'fetchUser' , moduleType: 'User'},
    { name: 'getUser' , moduleType: 'User'},
    { name: 'searchUser' , moduleType: 'User'},
    { name: 'forgotPassword' , moduleType: 'User'},
    { name: 'deactivateUser' , moduleType: 'User'},
    { name: 'removeUser' , moduleType: 'User'},
    { name: 'updateUser' , moduleType: 'User'},
    { name: 'updateUserRole' , moduleType: 'User'},
    { name: 'createRole' , moduleType: 'User'},
    { name: 'updateRole' , moduleType: 'User'},
    { name: 'getAllRoles' , moduleType: 'User'},
    { name: 'getRole' , moduleType: 'User'},
    { name: 'removeRole' , moduleType: 'User'},
    { name: 'createAppointment' , moduleType: 'Appointment'},
    { name: 'createExternalAppointment' , moduleType: 'Appointment'},
    { name: 'updateAppointment' , moduleType: 'Appointment'},
    { name: 'updateAppointmentBillingStatus' , moduleType: 'Appointment'},
    { name: 'findAllAppointments' , moduleType: 'Appointment'},
    { name: 'getAppointment' , moduleType: 'Appointment'},
    { name: 'getAppointments', moduleType: 'Appointment' },
    { name: 'removeAppointment' , moduleType: 'Appointment'},
    { name: 'cancelAppointment' , moduleType: 'Appointment'},
    { name: 'getPatientAppointment' , moduleType: 'Appointment'},
    { name: 'createFacility', moduleType: 'Facility' },
    { name: 'updateFacility' , moduleType: 'Facility' },
    { name: 'updateFacilityTimeZone' , moduleType: 'Facility' },
    { name: 'findAllFacility' , moduleType: 'Facility' },
    { name: 'getFacility' , moduleType: 'Facility' },
    { name: 'removeFacility' , moduleType: 'Facility' },
    { name: 'createService' , moduleType: 'Services' },
    { name: 'updateService'  , moduleType: 'Services' },
    { name: 'findAllServices'  , moduleType: 'Services' },
    { name: 'getService'  , moduleType: 'Services' },
    { name: 'removeService'  , moduleType: 'Services' },
    { name: 'createPatient'  , moduleType: 'Patient' },
    { name: 'updatePatient'  , moduleType: 'Patient' },
    { name: 'patientInfo'  , moduleType: 'Patient' },
    { name: 'updatePatientProfile'  , moduleType: 'Patient' },
    { name: 'sendInviteToPatient' , moduleType: 'Patient'  },
    { name: 'updatePatientProvider'  , moduleType: 'Patient' },
    { name: 'findAllPatient'  , moduleType: 'Patient' },
    { name: 'getPatient'  , moduleType: 'Patient' },
    { name: 'findPatientAttachments'  , moduleType: 'Patient' },
    { name: 'fetchAllPatients'  , moduleType: 'Patient' },
    { name: 'removePatient'  , moduleType: 'Patient' },
    { name: 'createPractice'  , moduleType: 'Practice' },
    { name: 'updatePractice'  , moduleType: 'Practice' },
    { name: 'findAllPractices'  , moduleType: 'Practice' },
    { name: 'getPractice'  , moduleType: 'Practice' },
    { name: 'removePractice'  , moduleType: 'Practice' },
    { name: 'createDoctor'  , moduleType: 'Provider' },
    { name: 'updateDoctor'  , moduleType: 'Provider' },
    { name: 'findAllDoctor'  , moduleType: 'Provider' },
    { name: 'getDoctor'  , moduleType: 'Provider' },
    { name: 'removeDoctor'  , moduleType: 'Provider' },
    { name: 'disableDoctor'  , moduleType: 'Provider' },
    { name: 'createStaff'  , moduleType: 'Staff' },
    { name: 'updateStaff'  , moduleType: 'Staff' },
    { name: 'findAllStaff'  , moduleType: 'Staff' },
    { name: 'getStaff'  , moduleType: 'Staff' },
    { name: 'removeStaff'  , moduleType: 'Staff' },
    { name: 'disableStaff'  , moduleType: 'Staff' },
    { name: 'createSchedule'  , moduleType: 'Schedule' },
    { name: 'getDoctorSchedule'  , moduleType: 'Schedule' },
    { name: 'getFacilitySchedule'  , moduleType: 'Schedule' },
    { name: 'updateSchedule'  , moduleType: 'Schedule' },
    { name: 'findAllSchedules'  , moduleType: 'Schedule' },
    { name: 'getSchedule'  , moduleType: 'Schedule' },
    { name: 'getSlots'  , moduleType: 'Schedule' },
    { name: 'removeSchedule'  , moduleType: 'Schedule' },
    { name: 'addPatientProblem'  , moduleType: 'Patient Charting' },
    { name: 'updatePatientProblem'  , moduleType: 'Patient Charting' },
    { name: 'findAllPatientProblem'  , moduleType: 'Patient Charting' },
    { name: 'searchIcdCodes'  , moduleType: 'Patient Charting' },
    { name: 'searchSnoMedCodeByIcdCodes'  , moduleType: 'Patient Charting' },   
    { name: 'getPatientProblem'  , moduleType: 'Patient Charting' },
    { name: 'removePatientProblem'  , moduleType: 'Patient Charting' },
    { name: 'createPermission'  , moduleType: 'Permissions' },
    { name: 'assignPermissionToRole'  , moduleType: 'Permissions' },
    { name: 'updatePermission'  , moduleType: 'Permissions' },
    { name: 'findAllPermissions'  , moduleType: 'Permissions' },
    { name: 'GetPermission'  , moduleType: 'Permissions' },
    { name: 'removePermission'  , moduleType: 'Permissions' },
    { name: 'addPatientVital'  , moduleType: 'Patient Charting' },
    { name: 'updatePatientVital'  , moduleType: 'Patient Charting' },
    { name: 'findAllPatientVitals'  , moduleType: 'Patient Charting' },
    { name: 'getPatientVital'  , moduleType: 'Patient Charting' },
    { name: 'removePatientVital'  , moduleType: 'Patient Charting' },
    { name: 'addPatientAllergy'  , moduleType: 'Patient Charting' },
    { name: 'updatePatientAllergy'  , moduleType: 'Patient Charting' },
    { name: 'findAllPatientAllergies'  , moduleType: 'Patient Charting' },
    { name: 'getPatientAllergy'  , moduleType: 'Patient Charting' },
    { name: 'removePatientAllergy'  , moduleType: 'Patient Charting' },
    { name: 'findAllReactions'  , moduleType: 'Patient Charting' },
    { name: 'findAllAllergies'  , moduleType: 'Patient Charting' },
    { name: 'createLabTestObservation'  , moduleType: 'Lab Orders' },
    { name: 'updateLabTestObservation'  , moduleType: 'Lab Orders' },
    { name: 'removeLabTestObservation'  , moduleType: 'Lab Orders' },
    { name: 'createLabTest'  , moduleType: 'Lab Orders' },
    { name: 'updateLabTest'  , moduleType: 'Lab Orders' },
    { name: 'getLabTest'  , moduleType: 'Lab Orders' },
    { name: 'findAllLabTest'  , moduleType: 'Lab Orders' }, 
    { name: 'removeLabTest'  , moduleType: 'Lab Orders' }
];
export const permissionDataNew = [
    { name: 'findPatientAttachments'  , moduleType: 'Patient' },
    { name: 'fetchAllPatients'  , moduleType: 'Patient' },
]

export const practiceAdminPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','updatePatientProvider','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createPractice',
'updatePractice','getPractice','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules', 'getFacilitySchedule','getDoctorSchedule', 'getSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem','createPermission','assignPermissionToRole',
'updatePermission','findAllPermissions','GetPermission','removePermission','addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital'
,'addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy'
,'createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const facilityAdminPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','updatePatientProvider','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createPractice',
'updatePractice','getPractice','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules', 'getFacilitySchedule','getDoctorSchedule', 'getSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem','createPermission','assignPermissionToRole',
'updatePermission','findAllPermissions','GetPermission','removePermission','addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital',
'addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy','createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const emergencyAccessPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','updatePatientProvider','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createPractice',
'updatePractice','getPractice','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules', 'getFacilitySchedule','getDoctorSchedule', 'getSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem','createPermission','assignPermissionToRole',
'updatePermission','findAllPermissions','GetPermission','removePermission','addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital',
'addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','getPatientAllergy','removePatientAllergy','createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const doctorPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus','findAllReactions',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient', 'findAllAllergies', 'getPatientAllergy', 'addPatientAllergy',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule', 'updatePatientAllergy',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem',,'addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital','createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const nursePermissionsList = ['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem','addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital']

export const patientPermissionsList = ['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule']

export const staffPermissionsList = ['createPatient','updatePatient','patientInfo','updatePatientProfile',
'findAllPatient','getPatient','createSchedule','updateSchedule','findAllSchedules','getSchedule',
'getDoctorSlots','findAllDoctor','getDoctor','getStaff','updateStaff']

export const practitionerNursePermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem'
,'addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital','addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy']

export const officeManagerPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes',
'findAllPatientProblem','updatePatientProblem','addPatientProblem','addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital',
'addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy'
,'createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const doctorAssistantPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem',
'addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital','addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy'
,'createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']

export const frontDeskPermissionsList = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
'findAllAppointments','getAppointment','getAppointments','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','findPatientAttachments','fetchAllPatients','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getSchedule','getFacilitySchedule','getDoctorSchedule','getSlots','removeSchedule',
'removePatientProblem','getPatientProblem','searchSnoMedCodeByIcdCodes', 'searchIcdCodes','findAllPatientProblem','updatePatientProblem','addPatientProblem',
'addPatientVital','updatePatientVital','findAllPatientVitals','getPatientVital','removePatientVital','addPatientAllergy','updatePatientAllergy','findAllPatientAllergies','findAllAllergies','getPatientAllergy','removePatientAllergy'
,'createLabTestObservation','updateLabTestObservation','removeLabTestObservation','createLabTest','updateLabTest','getLabTest','findAllLabTest','removeLabTest']
