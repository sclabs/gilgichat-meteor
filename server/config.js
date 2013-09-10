Accounts.loginServiceConfiguration.remove({
  service: "google"
});

Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "process.env.GOOGLE_CLIENT_ID",
  secret: "process.env.GOOGLE_SECRET"
});