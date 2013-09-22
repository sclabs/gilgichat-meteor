Template.body.events({
  "click .action-login": function(e, t) {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  },
  
  "click .action-logout": function(e, t) {
    Meteor.logout(function(err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  },
  
  "click .action-deselect": function() {
    if (Session.get("selected_room"))
      Meteor.call("updateTimestamp", Session.get("selected_room"));
    Session.set("selected_room", null);
  }
});

Template.content.selectedRoom = function() {
  return Session.get("selected_room");
};