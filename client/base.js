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
    selectedRoom = Session.get("selected_room")
    if (selectedRoom)
      Meteor.call("updateTimestamp", selectedRoom);
    Session.set("selected_room", null);
  }
});

Template.content.selectedRoom = function() {
  return Session.get("selected_room");
};
