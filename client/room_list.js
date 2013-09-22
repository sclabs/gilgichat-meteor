Template.room_list.rooms = function() {
  return Rooms.find({}, {sort: {name: 1}});
};

Template.content.events({
  "click .action-join": function() {
    // ask the user for a room name
    var roomName = prompt("Enter a name for your room");
    
    // trim whitespace
    if (roomName) {
      roomName = roomName.trim();
    }
    else
      return;
    
    // validation
    if (roomName == "") {
      alert("Please enter a valid room name!");
    } else {
      Meteor.call("joinRoom", roomName);
      Session.set("selected_room", roomName);
    }
  }
});

Template.room.events({
  "click .action-switch": function() {
    if (Session.get("selected_room"))
      Meteor.call("updateTimestamp", Session.get("selected_room"));
    Session.set("selected_room", this.name);
  },

  "click .action-leave": function() {
    if (Session.equals("selected_room", this.name)) {
      Session.set("selected_room", null);
    }
    Meteor.call("leaveRoom", this._id);
  }
});

Template.room.active = function() {
  return Session.equals("selected_room", this.name) ? "active" : '';
};

//Messages.find({}).observe({
//  added: function(document) {
//    if (Session.get("selected_room"))
//      Meteor.call("updateTimestamp", Session.get("selected_room"));
//  }
//});

Deps.autorun(function () {
  if (Session.get("selected_room"))
    Meteor.call("updateTimestamp", Session.get("selected_room"));
});

Template.room.unread = function() {
  if (Session.equals("selected_room", this.name))
    return "";
  var count = 0;
  var timestampDoc = Timestamps.findOne({user: Meteor.user()._id, room: this.name});
  if (timestampDoc)
    count = Messages.find({room: this.name, timestamp: {$gt: timestampDoc.timestamp}}).count();
  if (count != 0)
    return count;
  else
    return "";
};