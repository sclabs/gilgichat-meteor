// list of collections
Rooms = new Meteor.Collection("rooms");
Messages = new Meteor.Collection("messages");
Timestamps = new Meteor.Collection("timestamps");
//allUserData = new Meteor.Collection("allUserData");

// pub
if (Meteor.isServer) {
  Meteor.publish("rooms", function() {
    return Rooms.find({subscribers: this.userId});
  });
  
  Meteor.publish("messages", function() {
    var rooms = Rooms.find({subscribers: this.userId}, {name: 1}).fetch();
    var roomIds = [];
    for (var i = 0; i < rooms.length; i++) {
      roomIds[i] = rooms[i].name;
    }
    return Messages.find({room: {$in: roomIds}});
  });
  
  Meteor.publish("timestamps", function() {
    return Timestamps.find({user: this.userId});
  });

  Meteor.publish("allUserData", function() {
    return Meteor.users.find({}, {fields: {"status.online": 1}});
  });
}

// sub
if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("rooms");
    Meteor.subscribe("messages");
    Meteor.subscribe("timestamps");
    Meteor.subscribe("allUserData");
  });
}
