export default () => {

  let database: any;
  let logDatabase: any;
  let redis: any;
  if (process.env.NODE_ENV === "production") {
    database = {
      type: process.env.DATABASE_TYPE || "postgres",
      url: process.env.DATABASE_URL || "",
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
      migrations: ["dist/src/migrations/*{.ts,.js}"],
      entities: ["dist/src/**/*.entity{.ts,.js}"],
    };
    redis = {
      socket: {
        url: process.env.REDIS_URL || "redis://localhost:",
      },
    };

    logDatabase = {
      name: process.env.DATABASE_LOG_ID || 'logs-demo',
      type: process.env.DATABASE_LOG_TYPE || "postgres",
      url: process.env.DATABASE_LOG_TYPE + '://' + process.env.DATABASE_LOG_USERNAME + ':' + process.env.DATABASE_LOG_PASSWORD + '@' + process.env.DATABASE_LOG_HOST + ':' + process.env.DATABASE_LOG_PORT + '/' + process.env.DATABASE_LOG_NAME || "",
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
      migrations: ["dist/src/migrationsLogs/*{.ts,.js}"],
      entities: ["dist/src/**/*.entity.logs{.ts,.js}"],
    };
    redis = {
      socket: {
        url: process.env.REDIS_URL || "redis://localhost:",
      },
    };
    
  } else {
    database = {
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      type: process.env.DATABASE_TYPE || "postgres",
      username: process.env.DATABASE_USERNAME || "postgres",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE_NAME || "emr-pro",
      timezone: 'Z',
      migrationsRun: true,
      logging: true,
      migrations: ["dist/src/migrations/*{.ts,.js}"],
      entities: ["dist/src/**/*.entity{.ts,.js}"],
    };
    redis = {
      socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: 6379,
      },
    };

    logDatabase = {
      name: process.env.DATABASE_LOG_ID || 'logs',
      host: process.env.DATABASE_LOG_HOST || "localhost",
      port: parseInt(process.env.DATABASE_LOG_PORT, 10) || 5432,
      type: process.env.DATABASE_LOG_TYPE || "postgres",
      username: process.env.DATABASE_LOG_USERNAME || "postgres",
      password: process.env.DATABASE_LOG_PASSWORD || "password",
      database: process.env.DATABASE_LOG_NAME || "emr-pro-logs",
      timezone: 'Z',
      migrationsRun: true,
      logging: true,
      migrations: ["dist/src/migrationsLogs/*{.ts,.js}"],
      entities: ["dist/src/**/*.entity.logs{.ts,.js}"],
    };
    redis = {
      socket: {
        host: process.env.REDIS_LOG_HOST || "127.0.0.1",
        port: 6379,
      },
    };
  }

  return {
    PORT: parseInt(process.env.PORT, 10) || 3001,
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "",
    PATIENT_PORTAL_APP_BASE_URL:
      process.env.PATIENT_PORTAL_APP_BASE_URL || "",
    ADMIN_APP_BASE_URL:
      process.env.PORTAL_APP_BASE_URL || "",
    SENDGRID_API_KEY:
      process.env.SENDGRID_API_KEY ||
      "",
    NOTIFICATION_ADMIN_NEW_SIGN_UP_TEMPLATE_ID: process.env.NOTIFICATION_ADMIN_NEW_SIGN_UP_TEMPLATE_ID || "",
    REQUEST_INITIATED: process.env.REQUEST_INITIATED || "",
    UPDATE_DONE: process.env.UPDATE_DONE || "",
    REQUEST_APPROVED: process.env.REQUEST_APPROVED || "",
    REQUEST_UPDATE_NEEDED: process.env.REQUEST_UPDATE_NEEDED || "",
    REQUEST_UPDATE_DECLINED: process.env.REQUEST_UPDATE_DECLINED || "",
    INVITATION_TEMPLATE_ID: process.env.FORGOT_PASSWORD_TEMPLATE_ID || "",
    PATIENT_PORTAL_INVITATION_TEMPLATE_ID: process.env.PATIENT_PORTAL_INVITATION_TEMPLATE_ID || "",
    FORGOT_PASSWORD_TEMPLATE_ID: process.env.FORGOT_PASSWORD_TEMPLATE_ID || "",
    APPOINTMENT_TELEHEALTH_TEMPLATE_ID: process.env.APPOINTMENT_TELEHEALTH_TEMPLATE_ID || "",
    APPOINTMENT_CONFIRMATION_TEMPLATE_ID: process.env.APPOINTMENT_CONFIRMATION_TEMPLATE_ID || "",
    PATIENT_LAB_RESULTS_TEMPLATE_ID: process.env.PATIENT_LAB_RESULTS_TEMPLATE_ID || "",
    APPOINTMENT_REMINDER_TEMPLATE_ID: process.env.APPOINTMENT_REMINDER_TEMPLATE_ID || "",
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || "",
    TWILIO_OTP_SERVICE_SID: process.env.TWILIO_OTP_SERVICE_SID || "",
    redis,
    VERIFY_EMAIL_TEMPLATE_ID:
      process.env.VERIFY_EMAIL_TEMPLATE_ID ||
      "",
    FROM_EMAIL: process.env.FROM_EMAIL || "",
    database,
    logDatabase,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    AWS_S3_REGION: process.env.AWS_S3_REGION || "",
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",

    PUBLIC_AWS_ACCESS_KEY_ID: process.env.PUBLIC_AWS_ACCESS_KEY_ID || "",
    PUBLIC_AWS_SECRET_ACCESS_KEY: process.env.PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    PUBLIC_AWS_S3_REGION: process.env.PUBLIC_AWS_S3_REGION || "",
    PUBLIC_AWS_BUCKET_NAME: process.env.PUBLIC_AWS_BUCKET_NAME || "",
    
    DOCUSIGN_INTEGERATION_Key:
      process.env.DOCUSIGN_INTEGERATION_Key ||
      "",
    DOCUSIGN_SECRET_KEY:
      process.env.DOCUSIGN_SECRET_KEY || "",
    SIGNER_EMAIL: process.env.SIGNER_EMAIL || "",
    SIGNER_NAME: process.env.SIGNER_NAME || "",
    REDIRECRI_URI: process.env.REDIRECRI_URI || "",
    DOCUSIGN_ACCOUNT_ID:
      process.env.DOCUSIGN_ACCOUNT_ID || "",
    DOCUSIGN_BASEPATH:
      process.env.DOCUSIGN_BASEPATH || "",
    DOCUSIGN_USER_NAME: process.env.DOCUSIGN_USER_NAME || "",
    DOCUSIGN_BASEURL:
      process.env.DOCUSIGN_BASEURL ||
      "",
    DOCUSIGN_PASSWORD: process.env.DOCUSIGN_PASSWORD || "",
    WEBSOCKET_PORT: parseInt(process.env.WEBSOCKET_PORT, 10) || 9352,
    INSTAGRAM_FEEDS_TOKEN:
      process.env.INSTAGRAM_FEEDS_TOKEN ||
      "",
  };
};