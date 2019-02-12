
const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-infa-as-code-dev-attachmentsbucket-8uisnvbb8rcx"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://u8btvefph7.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_jhkFFbvQ6",
    APP_CLIENT_ID: "1fnbv5m5qan8ta9tcq693u432",
    IDENTITY_POOL_ID: "us-east-1:7afad2b5-8844-4dee-af53-c8b7c0da2e13"
  }
}

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-infa-as-code-prod-attachmentsbucket-tpkxfe2lyvmw"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://g0dl9snz0a.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_D0KTMwnYe",
    APP_CLIENT_ID: "5pa3a632pkc10ovo4ivclb79gj",
    IDENTITY_POOL_ID: "us-east-1:dffa15bd-858d-44dd-96c8-40fb35d4895c"
  }
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
