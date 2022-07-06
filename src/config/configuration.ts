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
      logging: false,
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
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "24h",
    PATIENT_PORTAL_APP_BASE_URL:
      process.env.PATIENT_PORTAL_APP_BASE_URL || "http://localhost:3001",
    ADMIN_APP_BASE_URL:
      process.env.PORTAL_APP_BASE_URL || "http://localhost:3000",
    SENDGRID_API_KEY:
      process.env.SENDGRID_API_KEY ||
      "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",
    NOTIFICATION_ADMIN_NEW_SIGN_UP_TEMPLATE_ID: process.env.NOTIFICATION_ADMIN_NEW_SIGN_UP_TEMPLATE_ID || "d-c4f935c3674b4341a10b3c226cea1b86",
    REQUEST_INITIATED: process.env.REQUEST_INITIATED || "d-156bae7fc5444c7bbbae2044f1d6e97b",
    UPDATE_DONE: process.env.UPDATE_DONE || "d-6048b558485c4873b1331834356a7a83",
    REQUEST_APPROVED: process.env.REQUEST_APPROVED || "d-59063472f76c4c5f9acb74cc93d0bf95",
    REQUEST_UPDATE_NEEDED: process.env.REQUEST_UPDATE_NEEDED || "d-80fb471a2ddc4d2bbf4305a164ff7164",
    REQUEST_UPDATE_DECLINED: process.env.REQUEST_UPDATE_DECLINED || "d-6343679f0f5448eaacdc0cb0a3ba4edc",
    INVITATION_TEMPLATE_ID: process.env.FORGOT_PASSWORD_TEMPLATE_ID || "d-c40af5d836ec4f029f9f9da1f9a06515",
    PATIENT_PORTAL_INVITATION_TEMPLATE_ID: process.env.PATIENT_PORTAL_INVITATION_TEMPLATE_ID || "d-0454982d8ec141849f5603a06fdf7b71",
    FORGOT_PASSWORD_TEMPLATE_ID: process.env.FORGOT_PASSWORD_TEMPLATE_ID || "d-56e7f1e73ce1456cb5cf89bec7aa3fb3",
    APPOINTMENT_TELEHEALTH_TEMPLATE_ID: process.env.APPOINTMENT_TELEHEALTH_TEMPLATE_ID || "d-45a2247d5064414fadbfe62b792b8625",
    APPOINTMENT_CONFIRMATION_TEMPLATE_ID: process.env.APPOINTMENT_CONFIRMATION_TEMPLATE_ID || "d-8f94685c66f6469fa154ee80fe8845c4",
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "ACe7e8da1801b74623b48f1e595d9eb79e",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "b7dc30fd3397d41decae99d0f2c1d303",
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || "+17472987729",
    TWILIO_OTP_SERVICE_SID: process.env.TWILIO_OTP_SERVICE_SID || "VA5c4c35ef0e488d74ad9b19efa3050300",
    redis,
    VERIFY_EMAIL_TEMPLATE_ID:
      process.env.VERIFY_EMAIL_TEMPLATE_ID ||
      "d-0923bc5b5cdb44f9993128a14bbbedd9",
    FROM_EMAIL: process.env.FROM_EMAIL || "ahmad.hassan@alxtel.com",
    database,
    logDatabase,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    AWS_S3_REGION: process.env.AWS_S3_REGION || "us-east-1",
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "boca-plus-private",
    DOCUSIGN_INTEGERATION_Key:
      process.env.DOCUSIGN_INTEGERATION_Key ||
      "6627cd91-560c-494f-b274-415af0568361",
    DOCUSIGN_SECRET_KEY:
      process.env.DOCUSIGN_SECRET_KEY || "94984962-5186-46d5-8eb8-097c83441b59",
    SIGNER_EMAIL: process.env.SIGNER_EMAIL || "tammy@boca-plus.com",
    SIGNER_NAME: process.env.SIGNER_NAME || "Tammy Battistessa",
    REDIRECRI_URI: process.env.REDIRECRI_URI || "http://localhost:3001/",
    DOCUSIGN_ACCOUNT_ID:
      process.env.DOCUSIGN_ACCOUNT_ID || "8a8507e3-46a6-427d-b7c2-e26b759d71c8",
    DOCUSIGN_BASEPATH:
      process.env.DOCUSIGN_BASEPATH || "https://demo.docusign.net/restapi",
    DOCUSIGN_USER_NAME: process.env.DOCUSIGN_USER_NAME || "tammy@boca-plus.com",
    DOCUSIGN_BASEURL:
      process.env.DOCUSIGN_BASEURL ||
      "https://appdemo.docusign.com/api/accounts",
    DOCUSIGN_PASSWORD: process.env.DOCUSIGN_PASSWORD || "BOCAKwanso159!",
    WEBSOCKET_PORT: parseInt(process.env.WEBSOCKET_PORT, 10) || 9352,
    INSTAGRAM_FEEDS_TOKEN:
      process.env.INSTAGRAM_FEEDS_TOKEN ||
      "EAADQ7DjtZAZAEBAMzLUGYjtblneLLES7mopZBGFzX0Y30RakWLHTWt6L908SPCeDbNnwxwKBprAUCflomUzvOJotepTwPiyLzOqJ4QU8iWPd2cu3E3MeeAOBZChIe9nTCiGlZAOawrbZAYrZAxHYZCYM8lcO2fjpoYNVLSuTyC45bhoVN8Lz6oz3DfYhITVuWZANlX4FJjVWWghPdSbQXRh2Qd6qOZB0yBoBYZD",
  };
};