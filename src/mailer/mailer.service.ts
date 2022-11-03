import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientResponse, MailService } from '@sendgrid/mail';
import { AppointmentConfirmationEmailType, DynamicTemplateData, RemainderEmailType, TemplateSwitch } from './dto/dynamicTemplateData.dto';


@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('SGMAILER')
    private readonly sgMail: MailService
  ) { }

  templateSwitch = (templateName: TemplateSwitch) => ({
    "requestInviteAdmin": this.configService.get('REQUEST_INVITE_ADMIN_TEMPLATE_ID'),
    "requestInviteUser": this.configService.get('REQUEST_INVITE_USER_TEMPLATE_ID'),
    "requestInviteUserReject": this.configService.get('REQUEST_INVITE_USER_REJECT_TEMPLATE_ID'),
    "caseAssigned": this.configService.get('CASE_ASSIGNED_TEMPLATE_ID'),
    "caseCreated": this.configService.get('CASE_CREATED_TEMPLATE_ID'),
    "caseStatusUpdate": this.configService.get('CASE_STATUS_UPDATE_TEMPLATE_ID'),
    "newSignUp": this.configService.get('NOTIFICATION_ADMIN_NEW_SIGN_UP_TEMPLATE_ID'),
    "requestInitated": this.configService.get('REQUEST_INITIATED'),
    "updateDone": this.configService.get('REQUEST_INITIATED'),
    "requestApproved": this.configService.get('REQUEST_APPROVED'),
    "updateNeeded": this.configService.get('REQUEST_UPDATE_NEEDED'),
    "updateDeclined": this.configService.get('REQUEST_UPDATE_DECLINED'),
    "appointmentConfirmation": this.configService.get('APPOINTMENT_CONFIRMATION_TEMPLATE_ID'),
    "patientPortalInvitation": this.configService.get("PATIENT_PORTAL_INVITATION_TEMPLATE_ID")
  })[templateName]

  /**
   * Sends email forgot password
   * @param email 
   * @param userId 
   * @param fullName 
   */
  async sendEmailForgotPassword(email: string, userId: string, fullName: string, providerName: string, isAdmin: boolean, token: string, isInvite: string) {
    const portalAppBaseUrl = isAdmin ? this.configService.get('PATIENT_PORTAL_APP_BASE_URL') : this.configService.get('ADMIN_APP_BASE_URL')
    let templateId = ''
    if (isInvite === 'PATIENT_PORTAL_INVITATION_TEMPLATE_ID') {
      templateId = this.configService.get('PATIENT_PORTAL_INVITATION_TEMPLATE_ID')
    } else if (isInvite === 'INVITATION_TEMPLATE_ID') {
      templateId = this.configService.get('INVITATION_TEMPLATE_ID')
    } else if (isInvite === 'FORGOT_PASSWORD_TEMPLATE_ID') {
      templateId = this.configService.get('FORGOT_PASSWORD_TEMPLATE_ID')
    }
    const url = isInvite ? `${portalAppBaseUrl}/set-password?token=${token}` : `${portalAppBaseUrl}/reset-password?token=${token}`
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId: templateId,
      dynamicTemplateData: {
        fullName,
        providerName,
        resetPasswordURL: url
      }
    };
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }


  /**
   * Sends appointment confirmations email
   * @param params 
   * @returns appointment confirmations email 
   */
  async sendAppointmentConfirmationsEmail(params: AppointmentConfirmationEmailType): Promise<ClientResponse> {

    const { email: to, fullName, id, patientPortal, slotStartTime, token, facilityEmail, facilityPhone } = params

    const from = this.configService.get('FROM_EMAIL')
    const emrAppBaseUrl = this.configService.get('PORTAL_APP_BASE_URL');
    const patientAppBaseUrl = this.configService.get('PATIENT_PORTAL_APP_BASE_URL');
    const templateId = this.configService.get('APPOINTMENT_CONFIRMATION_TEMPLATE_ID');

    const portalAppBaseUrl = patientPortal ? patientAppBaseUrl : emrAppBaseUrl
    const cancelAppointment = `${portalAppBaseUrl}/cancel-appointment/${token}`
    const moreInfo = `${portalAppBaseUrl}/patient-information/${id}`;

    const msg = {
      to,
      from,
      templateId,
      dynamicTemplateData: {
        fullName,
        slotStartTime,
        cancelAppointment,
        moreInfo,
        facilityEmail,
        facilityPhone: `+1 ${facilityPhone}`
      }
    };

    try {
      const [response] = await this.sgMail.send(msg);
      return response;
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  /**
   * Sends appointment reminder email
   * @param params 
   * @returns appointment reminder email 
   */
  async sendAppointmentReminderEmail(params: RemainderEmailType): Promise<ClientResponse> {

    const { email: to, facilityName, fullName, facilityEmail, facilityPhone, slotStartTime } = params

    const from = this.configService.get('FROM_EMAIL')
    const templateId = this.configService.get('APPOINTMENT_REMINDER_TEMPLATE_ID')

    const msg = {
      to,
      from,
      templateId,
      dynamicTemplateData: {
        fullName,
        scheduleStartDateTime: slotStartTime,
        facilityName,
        facilityEmail,
        facilityPhone: `+1 ${facilityPhone}`
      }
    };
    try {
      const [response] = await this.sgMail.send(msg);
      return response
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  async sendAppointmentTelehealthEmail(email: string, fullName: string, appointmentTime: string, providerName: string, id: string) {
    const patientAppBaseUrl = this.configService.get('PATIENT_PORTAL_APP_BASE_URL');
    const teleHealthURL = `${patientAppBaseUrl}/telehealth/${id}`
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId: this.configService.get('APPOINTMENT_TELEHEALTH_TEMPLATE_ID'),
      dynamicTemplateData: {
        fullName,
        appointmentTime,
        teleHealthURL: teleHealthURL,
        providerName
      }
    };
    try {
      await this.sgMail.send({ ...msg });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  async sendLabResultsEmail(email: string, fullName: string, attachment) {
    const patientAppBaseUrl = this.configService.get('PATIENT_PORTAL_APP_BASE_URL');
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId: this.configService.get('PATIENT_LAB_RESULTS_TEMPLATE_ID'),
      dynamicTemplateData: {
        fullName,
      },
      attachments: [
        {
          content: attachment,
          filename: "attachment.pdf",
          type: "application/pdf",
          disposition: "attachment"
        }
      ]
    };
    try {
      await this.sgMail.send({ ...msg });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  /**
   * Sends verification email to verify email address
   * @param email 
   * @param fullName 
   * @param userId 
   */
  async sendVerificationEmail(email: string, fullName: string, userId: string, isAdmin: boolean, token: string) {
    const portalAppBaseUrl = isAdmin ? this.configService.get('PATIENT_PORTAL_APP_BASE_URL') : this.configService.get('ADMIN_APP_BASE_URL');
    const verifyEmailURL = `${portalAppBaseUrl}/verify-email?token=${token}&email=${email}`
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId: this.configService.get('VERIFY_EMAIL_TEMPLATE_ID'),
      dynamicTemplateData: {
        fullName,
        verifyEmailURL
      }
    };
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  /**
   * Sends email notification admin
   * @param email 
   * @param templateName 
   * @param dynamicTemplateData 
   */
  async sendEmailNotification(email: string[], templateName: TemplateSwitch, dynamicTemplateData: DynamicTemplateData) {
    const templateId = this.templateSwitch(templateName);
    dynamicTemplateData.adminPortalURL = dynamicTemplateData.requestType ? this.configService.get('ADMIN_APP_BASE_URL') + dynamicTemplateData.requestType : this.configService.get('ADMIN_APP_BASE_URL')
    dynamicTemplateData.userPortalURL = dynamicTemplateData.requestType ? this.configService.get('PATIENT_PORTAL_APP_BASE_URL') + dynamicTemplateData.requestType : this.configService.get('PORTAL_APP_BASE_URL');
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId,
      dynamicTemplateData
    };
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  /**
   * Sends email
   * @param email 
   * @param templateName 
   * @param dynamicTemplateData 
   */
  async sendEmail(email: string, templateName: TemplateSwitch, dynamicTemplateData: DynamicTemplateData) {
    const templateId = this.templateSwitch(templateName);
    const msg = {
      to: email,
      from: this.configService.get('FROM_EMAIL'),
      templateId,
      dynamicTemplateData
    };
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}
