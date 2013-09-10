Accounts.onCreateUser(function(options, user) {
  user.profile = _.pick(user.services.google,
    "id",
    "email",
    "verified_email",
    "name",
    "given_name",
    "family_name",
    "picture",
    "locale",
    "gender"
  );
  return user;
});