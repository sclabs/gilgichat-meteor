Accounts.loginServiceConfiguration.remove({
  service: "google"
});

Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "509176269867.apps.googleusercontent.com",
  secret: process.env.GOOGLE_SECRET
});