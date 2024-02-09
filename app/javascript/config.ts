const config = {
  authentication: {
    providers: {
      email: {
        enable: true,
      },
      google: {
        enable: false,
        environments: {
          development: {
            authUrl: '/users/auth/google_oauth2'
          }
        }
      }
    },
  }
};

export default config;
