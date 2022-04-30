const config = {
    // Backend config
    // s3: {
    //   REGION: "us-west-2",
    //   BUCKET: "calmemaybe",
    // },
    // apiGateway: {
    //   REGION: "us-west-2",
    //   URL: "process.env.REACT_APP_API_URL",
    // },
    cognito: {
      AWS_REGION: "us-west-1",
      AWS_DEFAULT_REGION: "us-west-1",
      REGION: "us-west-1",
      USER_POOL_ID: "us-west-1_NXfk4Jdq7",
      APP_CLIENT_ID: "3v6f9olnfkdg0cn3n6i5mrl43g",
      IDENTITY_POOL_ID: "us-west-1:57641d0e-c262-43d3-a08d-4514ae2d79f0",    
    },
  };
  
  export default config;