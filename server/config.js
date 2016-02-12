//Accounts.loginServiceConfiguration.remove({
//  service: "google"
//});
//
//Accounts.loginServiceConfiguration.insert({
//  service: "google",
//  clientId: "509176269867.apps.googleusercontent.com",
//  secret: "vOwZ06ZPMrugActckrzKctJ8"
//});

ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        clientId: "509176269867.apps.googleusercontent.com",
        loginStyle: "popup",
        secret: "vOwZ06ZPMrugActckrzKctJ8"
      }
    }
);
