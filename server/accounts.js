Accounts.onCreateUser(function(options, user) {
  console.log(user.services.google.email);
  return user;
});