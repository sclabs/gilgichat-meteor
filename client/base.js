Template.user_loggedout.events({
  "click #login": function(e, t) {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function (err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  }
});

Template.user_loggedin.events({
  "click #logout": function(e, t) {
    Meteor.logout(function (err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  }
});