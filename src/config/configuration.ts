export default () => {
  let database: any;
  let redis: any;
  if (process.env.NODE_ENV === "production") {
    database = {
      type: process.env.DATABASE_TYPE || "postgres",
      url:
      process.env.DATABASE_URL || "postgres://fwphdjqkggapmx:dbcdc903a9f17b3186b96e4d6c3f10a7eb29e7a61d9da2c4ac0192a331dd4fb5@ec2-3-232-22-121.compute-1.amazonaws.com:5432/d9p4m19hkflote?sslmode=require",
      migrationsRun: true,
      ssl: {
      rejectUnauthorized: false,
    },
      logging: true,
      migrations: ["dist/migrations/*{.ts,.js}"],
      entities: ["dist/**/*.entity{.ts,.js}"],
    };
    redis = {
      socket: {
        url: process.env.REDIS_URL || "redis://localhost:",
      },
    };
  } else {
    database = {
      host: process.env.DATABASE_HOST || "ls-47a047cab644f437c55e363a98a2253745c53f64.c7pmtuahr2cl.us-east-1.rds.amazonaws.com",
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      type: process.env.DATABASE_TYPE || "postgres",
      username: process.env.DATABASE_USERNAME || "emrbackend",
      password: process.env.DATABASE_PASSWORD || "0P48e{$tqk]V?&GndWdI3]CHa)G;z9m{",
      database: process.env.DATABASE_NAME ||"emr-pro",
      timezone: 'Z',
      migrationsRun: true,
      logging: true,
      migrations: ["dist/migrations/*{.ts,.js}"],
      entities: ["dist/**/*.entity{.ts,.js}"],
    };
    redis = {
      socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
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
    APPOINTMENT_CONFIRMATION_TEMPLATE_ID: process.env.APPOINTMENT_CONFIRMATION_TEMPLATE_ID || "d-8f94685c66f6469fa154ee80fe8845c4",
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "ACe835bd46c85a40b950674c1af03c6b24",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "29a1c82e5053986e3a8d82dbd75a72c9",
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || "+16065955458",
    TWILIO_OTP_SERVICE_SID: process.env.TWILIO_OTP_SERVICE_SID || "VAcb380afca6eb8e01c6f104369e14f067",
    redis,
    VERIFY_EMAIL_TEMPLATE_ID:
      process.env.VERIFY_EMAIL_TEMPLATE_ID ||
      "d-0923bc5b5cdb44f9993128a14bbbedd9",
    FROM_EMAIL: process.env.FROM_EMAIL || "ahmad.hassan@alxtel.com",
    database,
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
